import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { NavController, IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit,OnDestroy {

  offers: Place[];
  placesSub:Subscription;
  isLoading=false;
  constructor(private placesService: PlacesService, private navCntrl: NavController, private router: Router) { }

  ngOnInit() {
    this.placesSub= this.placesService.places.subscribe(places => {
      this.offers=places;

    })
    ///this.offers = this.placesService.getPlaces();

  }
  ionViewWillEnter() {
    this.isLoading=true;
    this.placesService.fetchData().subscribe(()=>{
      this.isLoading=false;
    });
  }
  onEditOffer(offerId: string, slidingItem: IonItemSliding) {
    console.log(offerId);
    this.router.navigateByUrl('/places/tabs/offers/edit/' + offerId);
    slidingItem.close();
  }
  ngOnDestroy(){
    if(this.placesSub){
      this.placesSub.unsubscribe();
    }
  }
}
