import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.page.html',
  styleUrls: ['./signup-page.page.scss'],
})
export class SignupPagePage {
  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
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
    this.authService.signup(this.loginForm.value.email, this.loginForm.value.username, this.loginForm.value.password).then(user => {
      this.router.navigateByUrl('/login');
      this.loading.dismiss();
      this.createLoader();
    }).catch(err => {
      console.log(JSON.stringify(err));
      this.closeLoadingAndShowError(err);
    });
  }

  closeLoadingAndShowError(err: Error) {
    this.loading.dismiss();
    this.createLoader();
    this.alertCtrl.create({
      header: 'Signup Failed',
      message: err.message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

}
