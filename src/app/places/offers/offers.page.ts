import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  loadedPlaces:Place[];
  constructor(private placesService:PlacesService,private navCntrl:NavController) { }

  ngOnInit() {

    this.loadedPlaces=this.placesService.getPlaces();
    console.log(this.loadedPlaces);
  }


}
