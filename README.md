# Using BDD for Ionic Framework

If you want to create scenerios with me, please prepare your PC.
### Prerequisites for workshops
  - Install [Node.js](https://nodejs.org/) v8+ 
  - Install Java v1.8+ 
  - Install [Visual Studio Code](https://code.visualstudio.com/Download) 
  - Install latest version [Android Studio](https://developer.android.com/studio/?gclid=CjwKCAjwqLblBRBYEiwAV3pCJvpciscp5_gf89SYQAJQv-LMszo8zS7Cq4t0Snf0qtSPrwHCsWg-3RoCJCAQAvD_BwE) 
  - Install XCode for Mac users

After installation run command line and download ionic-cli and cordova with node.js
```sh
$ npm install -g cordova
$ npm isntall -g ionic
```

### For Windows Users
Add JAVA_HOME Path Variable with jdk path (C:\Program Files\Java\jdk1.8.***)
After installing project and npm install finished with exception please follow this [link](https://catalin.me/how-to-fix-node-js-gyp-err-cant-find-python-executable-python-on-windows/)

### For Mac Users
Update PATH variables with java and gradle under Android Studio 
```sh
vi ~/.bash-profile
export PATH=/Applications/Android\ Studio.app/Contents/gradle/gradle-4.10.1/bin/:$PATH
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_181.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH

:wq!
source ~/.bash_profile
```
### Prepare Project for Test
Download Project via git or direct download. There are two project under repository. BDDTestIonic folder is project that created with Ionic3 Framework, BDDTestIonic4 folder is project that created with Ionic4 Framework. 
Project not work because of service connection.

Run operations are same both projects. 
  - Open project folder in Visual Studio Code 
  - Open new  terminal from toolbar and write below codes
```sh
$ npm install
$ ionic cordova platform add android
$ ionic cordova build android
$ ionic cordova platform add ios //for mac users
$ ionic cordova build ios //for mac users
$ ionic serve
```
 - Open Android Studio and select open project from file system and path is `/platforms/android` under project folder
 - Select sdk from SDKManager and run project with emulator
 - Open XCode and select open project from file system and path is `/platforms/ios` under project folder
 - Run project with selected simulator

##### Note: please create an emulator with Android 9 version for Test
##### Note: please download 12.1 simulators for Test (Appium has a bug 12.2 version. See [ here](https://github.com/appium/appium-xcuitest-driver/pull/918) and [here](https://github.com/appium/appium/issues/12398) )
