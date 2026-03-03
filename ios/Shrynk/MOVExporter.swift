import AVFoundation
import CoreMedia
import Foundation
import Photos
import React

@objc(MOVExporter)
class MOVExporter: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc(exportToMov:resolver:rejecter:)
  func exportToMov(
    _ sourceUri: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    compressToMov(
      sourceUri,
      presetName: AVAssetExportPresetMediumQuality,
      resolver: resolve,
      rejecter: reject
    )
  }

  @objc(compressToMov:presetName:resolver:rejecter:)
  func compressToMov(
    _ sourceUri: String,
    presetName: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    resolveAsset(from: sourceUri) { asset in
      guard let asset else {
        reject("invalid_source_uri", "Unable to load source video asset.", nil)
        return
      }

      self.exportAssetToMov(
        asset: asset,
        presetCandidates: self.movPresetCandidates(requestedPresetName: presetName),
        expectedVideoCodec: nil,
        noCompatiblePresetErrorCode: "preset_unavailable",
        noCompatiblePresetErrorMessage: "No compatible export preset was found for this video.",
        exportFailedErrorCode: "mov_export_failed",
        exportFailedFallbackMessage: "MOV export failed.",
        exportCancelledErrorCode: "mov_export_cancelled",
        exportCancelledMessage: "MOV export was cancelled.",
        exportUnknownErrorCode: "mov_export_unknown",
        exportUnknownFallbackMessage: "MOV export failed with unknown status.",
        codecValidationErrorCode: "mov_codec_invalid",
        resolve: resolve,
        reject: reject
      )
    }
  }

  @objc(compressToHevcMov:presetName:resolver:rejecter:)
  func compressToHevcMov(
    _ sourceUri: String,
    presetName: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard #available(iOS 11.0, *) else {
      reject("hevc_unavailable", "HEVC export requires iOS 11 or newer.", nil)
      return
    }

    resolveAsset(from: sourceUri) { asset in
      guard let asset else {
        reject("invalid_source_uri", "Unable to load source video asset.", nil)
        return
      }

      self.exportAssetToMov(
        asset: asset,
        presetCandidates: self.hevcPresetCandidates(requestedPresetName: presetName),
        expectedVideoCodec: kCMVideoCodecType_HEVC,
        noCompatiblePresetErrorCode: "hevc_preset_unavailable",
        noCompatiblePresetErrorMessage: "No compatible HEVC export preset was found for this video.",
        exportFailedErrorCode: "hevc_export_failed",
        exportFailedFallbackMessage: "HEVC export failed.",
        exportCancelledErrorCode: "hevc_export_cancelled",
        exportCancelledMessage: "HEVC export was cancelled.",
        exportUnknownErrorCode: "hevc_export_unknown",
        exportUnknownFallbackMessage: "HEVC export failed with unknown status.",
        codecValidationErrorCode: "hevc_codec_invalid",
        resolve: resolve,
        reject: reject
      )
    }
  }

  private func resolveAsset(from sourceUri: String, completion: @escaping (AVAsset?) -> Void) {
    if sourceUri.hasPrefix("ph://") {
      let localIdentifier = sourceUri.replacingOccurrences(of: "ph://", with: "")
      let result = PHAsset.fetchAssets(withLocalIdentifiers: [localIdentifier], options: nil)
      guard let phAsset = result.firstObject else {
        completion(nil)
        return
      }

      let options = PHVideoRequestOptions()
      options.isNetworkAccessAllowed = true
      options.deliveryMode = .highQualityFormat
      PHImageManager.default().requestAVAsset(forVideo: phAsset, options: options) { asset, _, _ in
        completion(asset)
      }
      return
    }

    guard let sourceURL = Self.makeFileURL(from: sourceUri) else {
      completion(nil)
      return
    }

    guard FileManager.default.fileExists(atPath: sourceURL.path) else {
      completion(nil)
      return
    }

    completion(AVURLAsset(url: sourceURL))
  }

  private func exportAssetToMov(
    asset: AVAsset,
    presetCandidates: [String],
    expectedVideoCodec: CMVideoCodecType?,
    noCompatiblePresetErrorCode: String,
    noCompatiblePresetErrorMessage: String,
    exportFailedErrorCode: String,
    exportFailedFallbackMessage: String,
    exportCancelledErrorCode: String,
    exportCancelledMessage: String,
    exportUnknownErrorCode: String,
    exportUnknownFallbackMessage: String,
    codecValidationErrorCode: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    let compatiblePresets = AVAssetExportSession.exportPresets(compatibleWith: asset)
    let selectedPresetName = presetCandidates.first { compatiblePresets.contains($0) }

    guard let selectedPresetName else {
      reject(noCompatiblePresetErrorCode, noCompatiblePresetErrorMessage, nil)
      return
    }

    guard let exportSession = AVAssetExportSession(
      asset: asset,
      presetName: selectedPresetName
    ) else {
      reject("session_unavailable", "Unable to create AVAssetExportSession.", nil)
      return
    }

    guard exportSession.supportedFileTypes.contains(.mov) else {
      reject("mov_unsupported", "MOV export is not supported for this video.", nil)
      return
    }

    let outputURL = URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true)
      .appendingPathComponent("shrynk_\(UUID().uuidString)")
      .appendingPathExtension("mov")

    if FileManager.default.fileExists(atPath: outputURL.path) {
      do {
        try FileManager.default.removeItem(at: outputURL)
      } catch {
        reject("cleanup_failed", "Unable to prepare output file path.", error)
        return
      }
    }

    exportSession.outputURL = outputURL
    exportSession.outputFileType = .mov
    exportSession.shouldOptimizeForNetworkUse = true

    exportSession.exportAsynchronously {
      switch exportSession.status {
      case .completed:
        do {
          try self.verifyQuickTimeContainer(at: outputURL)
          if let expectedVideoCodec {
            try self.verifyVideoCodec(at: outputURL, expectedCodec: expectedVideoCodec)
          }
        } catch {
          DispatchQueue.main.async {
            reject(
              codecValidationErrorCode,
              "Exported file does not match expected MOV/codec format.",
              error
            )
          }
          return
        }

        DispatchQueue.main.async {
          resolve(outputURL.absoluteString)
        }
      case .failed:
        DispatchQueue.main.async {
          reject(
            exportFailedErrorCode,
            exportSession.error?.localizedDescription ?? exportFailedFallbackMessage,
            exportSession.error
          )
        }
      case .cancelled:
        DispatchQueue.main.async {
          reject(exportCancelledErrorCode, exportCancelledMessage, nil)
        }
      default:
        DispatchQueue.main.async {
          reject(
            exportUnknownErrorCode,
            exportSession.error?.localizedDescription ?? exportUnknownFallbackMessage,
            exportSession.error
          )
        }
      }
    }
  }

  private func movPresetCandidates(requestedPresetName: String) -> [String] {
    let candidates = [
      requestedPresetName,
      AVAssetExportPresetMediumQuality,
      AVAssetExportPresetLowQuality,
      AVAssetExportPreset960x540,
      AVAssetExportPreset640x480,
    ]

    return uniquePresetNames(candidates)
  }

  @available(iOS 11.0, *)
  private func hevcPresetCandidates(requestedPresetName: String) -> [String] {
    let candidates = [
      requestedPresetName,
      AVAssetExportPresetHEVCHighestQuality,
      AVAssetExportPresetHEVC3840x2160,
      AVAssetExportPresetHEVC1920x1080,
    ]

    return uniquePresetNames(candidates)
  }

  private func uniquePresetNames(_ presets: [String]) -> [String] {
    var seen = Set<String>()
    var orderedUnique: [String] = []

    for preset in presets where !seen.contains(preset) {
      seen.insert(preset)
      orderedUnique.append(preset)
    }

    return orderedUnique
  }

  private static func makeFileURL(from sourceUri: String) -> URL? {
    if sourceUri.hasPrefix("file://") {
      return URL(string: sourceUri)
    }

    if let decodedUri = sourceUri.removingPercentEncoding, decodedUri.hasPrefix("file://") {
      return URL(string: decodedUri)
    }

    return URL(fileURLWithPath: sourceUri)
  }

  private func verifyQuickTimeContainer(at fileURL: URL) throws {
    let headerSize = 32
    let handle = try FileHandle(forReadingFrom: fileURL)
    defer {
      try? handle.close()
    }

    guard let headerData = try handle.read(upToCount: headerSize), headerData.count >= 12 else {
      throw NSError(
        domain: "MOVExporter",
        code: 1,
        userInfo: [NSLocalizedDescriptionKey: "Output header is too short."]
      )
    }

    let ftypBytes = Data("ftyp".utf8)
    guard let ftypRange = headerData.range(of: ftypBytes) else {
      throw NSError(
        domain: "MOVExporter",
        code: 2,
        userInfo: [NSLocalizedDescriptionKey: "Missing ftyp atom in output file."]
      )
    }

    let brandStart = ftypRange.upperBound
    let brandEnd = brandStart + 4
    guard brandEnd <= headerData.count else {
      throw NSError(
        domain: "MOVExporter",
        code: 3,
        userInfo: [NSLocalizedDescriptionKey: "Missing major brand in output file."]
      )
    }

    let brandData = headerData.subdata(in: brandStart ..< brandEnd)
    guard let majorBrand = String(data: brandData, encoding: .ascii), majorBrand == "qt  " else {
      throw NSError(
        domain: "MOVExporter",
        code: 4,
        userInfo: [NSLocalizedDescriptionKey: "Output major brand is not QuickTime."]
      )
    }
  }

  private func verifyVideoCodec(at fileURL: URL, expectedCodec: CMVideoCodecType) throws {
    let outputAsset = AVURLAsset(url: fileURL)
    guard let videoTrack = outputAsset.tracks(withMediaType: .video).first else {
      throw NSError(
        domain: "MOVExporter",
        code: 5,
        userInfo: [NSLocalizedDescriptionKey: "Exported MOV does not contain a video track."]
      )
    }

    for formatDescription in videoTrack.formatDescriptions {
      let descriptionRef = formatDescription as CFTypeRef
      guard CFGetTypeID(descriptionRef) == CMFormatDescriptionGetTypeID() else {
        continue
      }

      let description = unsafeBitCast(descriptionRef, to: CMFormatDescription.self)

      if CMFormatDescriptionGetMediaSubType(description) == expectedCodec {
        return
      }
    }

    throw NSError(
      domain: "MOVExporter",
      code: 6,
      userInfo: [NSLocalizedDescriptionKey: "Exported MOV does not use the requested codec."]
    )
  }
}
