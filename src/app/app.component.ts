import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AndroidFullScreen } from "@ionic-native/android-full-screen";
import { WelcomePage } from "../pages/welcome/welcome";
import { Storage } from "@ionic/storage";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(private platform: Platform,
                private statusBar: StatusBar,
                private storage: Storage,
                private splashScreen: SplashScreen,
                private androidFullScreen: AndroidFullScreen) {
        if (this.platform.is("mobile")) {
            this.storage.get('firstIn').then((res) => {
                if (res) {
                    this.statusBar.show();
                    this.rootPage = TabsPage
                } else {
                    this.statusBar.hide();
                    this.storage.set('firstIn', true);
                    this.rootPage = WelcomePage;
                }
            })
        } else {
            this.rootPage = TabsPage
        }
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            if (this.platform.is('cordova')) {
                // show statusbar
                this.androidFullScreen.isSupported().then(() => this.androidFullScreen.showSystemUI());
            }
        });
    }
}
