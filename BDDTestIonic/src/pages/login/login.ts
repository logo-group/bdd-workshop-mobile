import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthenticationProvider,
    public alertCtrl: AlertController,
    public loadingCrtl: LoadingController
  ) {
    this.loading = this.loadingCrtl.create();
  }

  setupPageNavigation() {
    this.loading.present();
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).then(user => {
      this.navCtrl.setRoot(HomePage);
      this.loading.dismiss();
      this.loading = this.loadingCrtl.create();
    }).catch(err => {
      console.log(JSON.stringify(err));
      this.closeLoadingAndShowError(err);
    });
  }

  closeLoadingAndShowError(err: Error) {
    this.loading.dismiss();
    this.loading = this.loadingCrtl.create();
    this.alertCtrl.create({
      title: 'Login failed',
      message: err.message,
      buttons: ['OK']
    }).present();
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

}
