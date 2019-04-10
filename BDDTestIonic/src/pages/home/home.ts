import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LoginPage } from '../login/login';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  loading: any;
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCrtl: LoadingController,
    public toast: ToastController,
    public authService: AuthenticationProvider
  ) {
    this.loading = this.loadingCrtl.create();
  }

  ionViewDidLoad() {
    if (this.authService.userId) {
      this.authService.getUser(this.authService.userId).then(user => this.user = user).catch(err => {
        this.toast.create({
          message: err.message,
          position: 'middle',
          duration: 5000
        }).present();
        this.navCtrl.setRoot(LoginPage);
      });
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  logout() {
    this.authService.userId = null;
    this.navCtrl.setRoot(LoginPage);
  }

}
