import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  form: FormGroup
  place: Place;
  placeId:string;
  placesSub: Subscription;
  isLoading=false;
  constructor(private route: ActivatedRoute, private placesService: PlacesService, 
    private navCntrl: NavController, private loadingCntrl: LoadingController,
    private router :Router,private alertController: AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      if (!params.get('placeId')) {
        this.navCntrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.isLoading=true;
      this.placeId=params.get('placeId');
      this.placesSub = this.placesService.getPlace(params.get('placeId')).subscribe(place => {
        this.place = place;
        this.form = new FormGroup({
          title: new FormControl(this.place.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.place.desc, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.max(180)]
          })
        })
        this.isLoading=false;

      },error=>{
          this.alertController.create({
            header:'An error occured',
            message:'Somethiing wen twrong !! </br> Please try again later.',
            buttons:[{
              text: 'OK',
              handler:()=>{
                this.router.navigateByUrl('/places/tabs/offers');
              } 
            }
            ]
          }).then(alertEl=>{
            alertEl.present();
          })
      });
    })
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }

    this.loadingCntrl.create({
      message: 'Updating place..'
    }).then(loadingEl => {
      loadingEl.present();
      this.placesService.updatePlace(this.place.id, this.form.value.title, this.form.value.description).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigateByUrl('/places/tabs/offers')
      })
    })
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
