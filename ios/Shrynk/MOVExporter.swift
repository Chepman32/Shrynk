import AVFoundation
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
        requestedPresetName: presetName,
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
    requestedPresetName: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    let compatiblePresets = AVAssetExportSession.exportPresets(compatibleWith: asset)
    let selectedPresetName = selectPreset(
      requestedPresetName: requestedPresetName,
      compatiblePresets: compatiblePresets
    )

    guard let selectedPresetName else {
      reject("preset_unavailable", "No compatible export preset was found for this video.", nil)
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
        DispatchQueue.main.async {
          resolve(outputURL.absoluteString)
        }
      case .failed:
        DispatchQueue.main.async {
          reject(
            "mov_export_failed",
            exportSession.error?.localizedDescription ?? "MOV export failed.",
            exportSession.error
          )
        }
      case .cancelled:
        DispatchQueue.main.async {
          reject("mov_export_cancelled", "MOV export was cancelled.", nil)
        }
      default:
        DispatchQueue.main.async {
          reject(
            "mov_export_unknown",
            exportSession.error?.localizedDescription ?? "MOV export failed with unknown status.",
            exportSession.error
          )
        }
      }
    }
  }

  private func selectPreset(
    requestedPresetName: String,
    compatiblePresets: [String]
  ) -> String? {
    let candidates = [
      requestedPresetName,
      AVAssetExportPresetMediumQuality,
      AVAssetExportPresetLowQuality,
      AVAssetExportPreset960x540,
      AVAssetExportPreset640x480,
    ]

    for candidate in candidates where compatiblePresets.contains(candidate) {
      return candidate
    }

    return nil
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
}
