import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service'
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {  NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(private authService:AuthService,private router :Router,private loadingCntrl:LoadingController) { }
    isLogin=true;
  ngOnInit() {
  }

  doLogin(){
    this.authService.login(); 
    this.loadingCntrl.create({
      keyboardClose:true,
      spinner:"crescent",
      message : 'Logging in..'
    }).then(loaderEl=>{
      loaderEl.present();
      setTimeout(() => {
        loaderEl.dismiss()
        this.router.navigateByUrl('/places/tabs/discover');
      }, 1500);
    })
  }

  submitForm(loginForm:NgForm){
    console.log(loginForm)
    if(!loginForm.valid){
      return ;
    } 

    let email=loginForm.value.email;
    let password=loginForm.value.password;
    console.log(email,password);

  }

  toggleMode(){
    this.isLogin=!this.isLogin;
  }
}
