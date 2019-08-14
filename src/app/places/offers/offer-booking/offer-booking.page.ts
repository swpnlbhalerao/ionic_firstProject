import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-booking',
  templateUrl: './offer-booking.page.html',
  styleUrls: ['./offer-booking.page.scss'],
})
export class OfferBookingPage implements OnInit, OnDestroy {
  place: Place;
  placesSub: Subscription;
  constructor(private route: ActivatedRoute, private placesService: PlacesService, private navCntrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      if (!params.get('placeId')) {
        this.navCntrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placesSub = this.placesService.getPlace(params.get('placeId')).subscribe(place => {
        this.place = place;
      });


    })
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
