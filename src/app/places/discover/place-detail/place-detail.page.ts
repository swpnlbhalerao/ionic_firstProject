import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place:Place;
  constructor(private route : ActivatedRoute,private placesService:PlacesService,private navCntrl:NavController) { }

  ngOnInit() {
  }

  bookPlace(){
    
    this.route.paramMap.subscribe(params=>{
      console.log(params);
      if(!params.get('placeId')){
        this.navCntrl.navigateBack('/places/tabs/discover');
        return ;
      }
      this.place=this.placesService.getPlace(params.get('placeId'));

    })



  }

}
