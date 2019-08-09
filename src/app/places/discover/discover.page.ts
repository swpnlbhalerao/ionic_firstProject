import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedPlaces:Place[];
  listLoadedPlaces:Place[];
  constructor(private placesService:PlacesService) { }

  ngOnInit() {

    this.loadedPlaces=this.placesService.getPlaces();
    this.listLoadedPlaces=this.loadedPlaces.slice(1);
    console.log(this.loadedPlaces);
  }

  onFilterUpdate(event :CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);

  }

}
