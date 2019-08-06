import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-offer-booking',
  templateUrl: './offer-booking.page.html',
  styleUrls: ['./offer-booking.page.scss'],
})
export class OfferBookingPage implements OnInit {
  place:Place;
  constructor(private route:ActivatedRoute,private placesService:PlacesService,private navCntrl:NavController) { }

  ngOnInit() {
      this.route.paramMap.subscribe(params=>{
        console.log(params);
        if(!params.get('placeId')){
          this.navCntrl.navigateBack('/places/tabs/offers');
          return ;
        }
        this.place=this.placesService.getPlace(params.get('placeId'));

      })
 
 
  }

}
