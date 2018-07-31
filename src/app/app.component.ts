import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

declare var AMapPlugin: any;
declare var cordova: any;
declare var networkinterface: any;
declare var device: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

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
          console.log("AMapPlugin", AMapPlugin);
          console.log("AMapPlugin.readUpdatePosition", AMapPlugin.readUpdatePosition);
          AMapPlugin.getCurrentPosition(function (data) {
            alert("data111")
            alert("data" + JSON.stringify(data));
          }, function (err) {
            alert("err" + JSON.stringify(err));
          })
        }
      }

      alert(typeof(cordova));

      if (typeof cordova != 'undefined') {
        document.addEventListener("deviceready", onDeviceReady, false);
      }
    });
  }
}
