import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  form: FormGroup
  place: Place;
  constructor(private route: ActivatedRoute, private placesService: PlacesService, private navCntrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      if (!params.get('placeId')) {
        this.navCntrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.place = this.placesService.getPlace(params.get('placeId'));
    })

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
  }

  onUpdateOffer(){
    if(!this.form.valid){
      return ;
    }

    console.log(this.form);
  }

}
