#import "AppDelegate.h"
#import <GoogleMaps/GoogleMaps.h>
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import "RNBootSplash.h" // BootSplash 

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // 1. Google Maps API Key (Secrets.plist'ten çekme)
  NSString *path = [[NSBundle mainBundle] pathForResource:@"Secrets" ofType:@"plist"];
  NSDictionary *secrets = [NSDictionary dictionaryWithContentsOfFile:path];
  NSString *apiKey = secrets[@"GMSApiKey"];
  [GMSServices provideAPIKey:apiKey];
  
  // 2. Firebase Konfigürasyonu
  [FIRApp configure];

  // 3. React Native Modern Init
  self.moduleName = @"MapApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// 4. BootSplash için gerekli metod (0.76+ için modern yöntem)
- (void)customizeRootView:(RCTRootView *)rootView {
  [RNBootSplash initWithStoryboard:@"LaunchScreen" rootView:rootView];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end