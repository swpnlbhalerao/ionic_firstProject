import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

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
