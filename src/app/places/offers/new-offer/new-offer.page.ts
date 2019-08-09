import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from 'src/app/auth/auth.service';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;


  constructor(private authService:AuthService,private placeService:PlacesService,private router :Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null,{
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        description: new FormControl(null,{
          updateOn: 'blur',
          validators: [Validators.required,Validators.maxLength(180)]
        }),
        price: new FormControl(null,{
          updateOn: 'blur',
          validators: [Validators.required,Validators.min(1)]
        }),
        fromDate: new FormControl(null,{
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        toDate: new FormControl(null,{
          updateOn: 'blur',
          validators: [Validators.required]
        }),

    })


  }
  onCreateOffer() {
    console.log(this.form);
    if(!this.form.valid){
      return ;
    }
    this.placeService.addPlace(Math.random.toString(),this.form.value.title,
    this.form.value.desc,'https://img.veenaworld.com/group-tours/world/america/amwc/amwc-ovw.jpg',this.form.value.price,this.form.value.fromDate,
    this.form.value.toDate,this.authService.userId); 
    this.form.reset(); 
    this.router.navigateByUrl('/places/tabs/offers');
  }
}
