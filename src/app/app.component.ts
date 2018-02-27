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
        if (typeof networkinterface != 'undefined') {
          console.log(networkinterface.getWiFiIPAddress);
          networkinterface.getWiFiIPAddress(function (ip) {
            alert(ip);
          });
        }

        // 持续定位
        // if (typeof AMapPlugin != 'undefined') {
        //   console.log(AMapPlugin.startUpdatePosition);
        //   AMapPlugin.startUpdatePosition(function (data) {
        //     alert("data1" + JSON.stringify(data));
        //   }, function(err) {
        //     alert("err1" + JSON.stringify(err));
        //   });

        //   AMapPlugin.readUpdatePosition(function(data) {
        //     alert("success2" + JSON.stringify(data));
        //   }, function(err) {
        //     alert("err2" + JSON.stringify(err));
        //   })
        // }

        // 单次定位
        if (typeof AMapPlugin != 'undefined') {
          setInterval(function () {
            AMapPlugin.getCurrentPosition(function (data) {
              alert("data" + JSON.stringify(data));
            }, function (err) {
              alert("err" + JSON.stringify(err));
            })
          }, 5000);
        }
      }

      if (typeof cordova != 'undefined') {
        document.addEventListener("deviceready", onDeviceReady, false);
      }
    });
  }
}
