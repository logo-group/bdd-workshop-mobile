import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavParams, NavController, LoadingController } from '@ionic/angular';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage {

  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  loading: HTMLIonLoadingElement;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthenticationServiceService,
    public alertCtrl: AlertController,
    public loadingCrtl: LoadingController
  ) {
    this.createLoader();
  }

  createLoader() {
    this.loadingCrtl.create().then(load => this.loading = load);
  }

  setupPageNavigation() {
    this.loading.present();
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).then(user => {
      this.router.navigateByUrl('/home');
      this.loading.dismiss();
      this.createLoader();
    }).catch(err => {
      console.log(JSON.stringify(err));
      this.closeLoadingAndShowError(err);
    });
  }

  navigateSignup() {
    this.router.navigateByUrl('/signup');
  }

  closeLoadingAndShowError(err: Error) {
    this.loading.dismiss();
    this.createLoader();
    this.alertCtrl.create({
      header: 'Login failed',
      message: err.message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

}
