import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  loading: HTMLIonLoadingElement;
  user: any;

  constructor(
    public router: Router,
    public authService: AuthenticationServiceService,
    public loadingCrtl: LoadingController,
    public toast: ToastController
  ) {
    this.loadingCrtl.create().then(load => this.loading = load);
  }

  ngOnInit() {
    if (this.authService.userId) {
      this.authService.getUser(this.authService.userId).then(user => this.user = user).catch(err => {
        this.toast.create({
          message: err.message,
          position: 'middle',
          duration: 5000,
          animated: true,
          color: 'danger'
        }).then(t => t.present());
        this.router.navigateByUrl('/login', { replaceUrl: true });
      });
    } else {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }
}
