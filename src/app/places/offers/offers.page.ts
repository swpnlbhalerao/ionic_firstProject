import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { NavController, IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  offers:Place[];
  constructor(private placesService:PlacesService,private navCntrl:NavController,private router:Router) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.offers=this.placesService.getPlaces();

  }

  onEditOffer(offerId:string,slidingItem:IonItemSliding){
    console.log(offerId);
    this.router.navigateByUrl('/places/tabs/offers/edit/'+offerId);
    slidingItem.close();

  }

}
