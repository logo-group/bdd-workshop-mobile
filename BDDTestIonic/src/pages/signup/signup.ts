import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
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
    this.loading = this.loadingCrtl.create();
    this.authService.signup(this.loginForm.value.email, this.loginForm.value.username, this.loginForm.value.password).then(user => {
      this.loading = this.loadingCrtl.create();
      this.alertCtrl.create({
        title: 'Signup Successfully',
        message: '',
        buttons: ['OK']
      }).present();
    }).catch(err => {
      console.log(JSON.stringify(err));
      this.closeLoadingAndShowError(err);
    });
  }

  closeLoadingAndShowError(err: Error) {
    this.loading.dismiss();
    this.loading = this.loadingCrtl.create();
    this.alertCtrl.create({
      title: 'Signup Failed',
      message: err.message,
      buttons: ['OK']
    }).present();
  }

}
