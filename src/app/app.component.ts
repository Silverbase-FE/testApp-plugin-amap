import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

declare var AMapPlugin: any;
declare var cordova: any;
declare var networkinterface: any;
declare var device: any;

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  platform: any = Platform;
  toast: any = ToastController;
  backButtonPressed: boolean = false; // 用于判断返回键是否触发
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, toast: ToastController) {
    this.platform = platform;
    this.toast = toast;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      console.log("platform is ready!");

      function onDeviceReady() {
        alert(JSON.stringify(device));
        alert(JSON.stringify(cordova));
        alert(typeof networkinterface);
        alert(typeof AMapPlugin);
        if(typeof networkinterface != 'undefined'){
          console.log(networkinterface.getWiFiIPAddress);
  　　　　　　networkinterface.getWiFiIPAddress(function(ip){
  　　　　　　　　alert(ip);
  　　　　　　});
  　　　　}

        if (typeof AMapPlugin != 'undefined') {
          console.log(AMapPlugin.startUpdatePosition);
          AMapPlugin.startUpdatePosition(function (data) {
            alert("success" + JSON.stringify(data));

            if (data == 200) {
              AMapPlugin.readUpdatePosition(function(data) {
                alert("success" + JSON.stringify(data));
              }, function(err) {
                alert("error" + JSON.stringify(err));
              });
            }
          }, function(err) {
            alert("err" + JSON.stringify(err));
          });
        }
      }

      if (typeof cordova != 'undefined') {
        document.addEventListener("deviceready", onDeviceReady, false);
      }
    });
  }
}
