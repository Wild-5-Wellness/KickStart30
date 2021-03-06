package com.wild5wellness.kickstart30;
import android.app.Application;
import com.facebook.react.ReactApplication;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
// import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
// import java.util.Arrays;
import java.util.List;
import android.content.Context;
import com.facebook.react.PackageList;
import java.lang.reflect.InvocationTargetException;
import com.rollbar.RollbarReactNative;
//import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;

public class MainApplication extends Application implements ReactApplication {

 private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      packages.add(new RNFirebaseDatabasePackage());
      packages.add(new RNFirebaseAuthPackage());
     //packages.add(new RNDateTimePickerPackage());
            return packages;
    };
  

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
     RollbarReactNative.init(this, "60070a6defd04f68b747dded2d99875c", "production");
  }

}