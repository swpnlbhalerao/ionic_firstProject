import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit,OnDestroy {
  loadedPlaces:Place[];
  listLoadedPlaces:Place[];
  placesSub:Subscription;
  revelantPlaces:Place[];
  isLoading=false;
  eventType="all";
  constructor(private placesService:PlacesService,private authService:AuthService) { }

  ngOnInit() {
    this.placesSub= this.placesService.places.subscribe(places => {
      this.loadedPlaces=places;
/*       this.revelantPlaces=this.loadedPlaces;
      this.listLoadedPlaces=this.revelantPlaces.slice(1); */
      this.showDataByEvent(this.eventType);
    })
/* 
    this.loadedPlaces=this.placesService.getPlace();
    this.listLoadedPlaces=this.loadedPlaces.slice(1);
    console.log(this.loadedPlaces); */
  }

  ionViewWillEnter() {
    this.isLoading=true;
    this.placesService.fetchData().subscribe(()=>{
      this.isLoading=false;
    });
  }

  onFilterUpdate(event :CustomEvent<SegmentChangeEventDetail>){
    /* console.log(event.detail) */;
    this.eventType=event.detail.value;
    this.showDataByEvent(this.eventType);
   
  }
  showDataByEvent(eventType:string){
    this.authService.userId.subscribe(userId => {
    console.log(userId);
      if(eventType === 'all'){
      this.revelantPlaces=this.loadedPlaces;
      this.listLoadedPlaces=this.revelantPlaces.slice(1);
      }else{
        console.log("available")
        console.log(this.loadedPlaces);

        this.revelantPlaces=this.loadedPlaces.filter(place=>{
          return place.userId !== userId
        })
        this.listLoadedPlaces=this.revelantPlaces.slice(1);
        console.log(this.revelantPlaces);

      }
    });
  }



  ngOnDestroy(){
    if(this.placesSub){
      this.placesSub.unsubscribe();
    }
  }

}
