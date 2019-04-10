import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignupPagePage } from './signup-page.page';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  {
    path: '',
    component: SignupPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [SignupPagePage]
})
export class SignupPagePageModule {}
