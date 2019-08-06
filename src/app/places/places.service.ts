import { Injectable } from '@angular/core';
import { Place } from './place.model'

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
    places : Place[]=[
      new Place(
        'p1',
        'mumbai south',
        'cool place to hangout',
        'http://citizenmatters.in/wp-content/uploads/sites/2/2019/04/settlements-south-mumbai-678x381.jpg',
        1000
      ),new Place(
        'p2',
        'mumbai east',
        'cool place to hangout',
        'https://img.staticmb.com/mbphoto/property/cropped_images/2019/Apr/03/Photo_h180_w240/41109775_10_main_180_240.jpg',
        1000
      ),new Place(
        'p3',
        'mumbai west',
        'cool place to hangout',
        'https://cdnspimgsulekhalive.azureedge.net/cdn/images/property/project/detail/sahajanand-arista-in-goregaon%20west-mumbai-projectpicture_20160718051541961575.png',
        1000
      ),
      
    ]

    getPlaces(){
      return [... this.places];
    }

    getPlace(id:string){
      return {... this.places.find(place=>{
        return place.id === id;
      }) }
    }

  constructor() { }
}
