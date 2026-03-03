#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MOVExporter, NSObject)

RCT_EXTERN_METHOD(exportToMov:(NSString *)sourceUri
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(compressToMov:(NSString *)sourceUri
                  presetName:(NSString *)presetName
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
