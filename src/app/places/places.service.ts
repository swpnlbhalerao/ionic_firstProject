import { Injectable } from '@angular/core';
import { Place } from './place.model'
import { BehaviorSubject } from 'rxjs';
import { take, map, tap,delay, switchMap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';


interface PlacesData{
  availableFrom: Date,
  availableTo:Date,
  desc: string,
  imageUrl: string,
  price: number
  title: string,
  userId: string,
 } 


@Injectable({
  providedIn: 'root'
})
/* 
[
  new Place(
    'p1',
    'mumbai south',
    'cool place to hangout',
    'http://citizenmatters.in/wp-content/uploads/sites/2/2019/04/settlements-south-mumbai-678x381.jpg',
    1000,
    new Date('2019-01-01'),
    new Date('2019-12-31'),
    'abc'
  ),new Place(
    'p2',
    'mumbai east',
    'cool place to hangout',
    'https://img.staticmb.com/mbphoto/property/cropped_images/2019/Apr/03/Photo_h180_w240/41109775_10_main_180_240.jpg',
    1000,
    new Date('2019-01-01'),
    new Date('2019-12-31'),
    'lmn'
 
  ),new Place(
    'p3',
    'mumbai west',
    'cool place to hangout',
    'https://cdnspimgsulekhalive.azureedge.net/cdn/images/property/project/detail/sahajanand-arista-in-goregaon%20west-mumbai-projectpicture_20160718051541961575.png',
    1000,   
    new Date('2019-01-01'),
    new Date('2019-12-31'),
    'abc'
  ),
] */
export class PlacesService {
    generatedId:string;
    _places = new BehaviorSubject<Place[]>([]);

    get places(){
      return this._places.asObservable();
    }

    getPlace(id:string){
      return this.http.get<PlacesData>(`https://ionic-angular-249706.firebaseio.com/offered-places/${id}.json`)
      .pipe(map(responseData=>{
          return new Place(id,
            responseData.title,
            responseData.desc,responseData.imageUrl,responseData.price
            ,new Date(responseData.availableFrom),new Date(responseData.availableTo),responseData.userId);
      }));
    
    
      /*  return  this.places.pipe(take(1),map(places=>{
          return places.find(place=>{
          return place.id === id;
        }) 
      })) */
    }

    addPlace(id: string,title: string,desc: string,imageUrl: string,price: Number,availableFrom:Date,
      availableTo:Date,userId:string) {

        const newPlace=new Place(id,title,desc,imageUrl,price,availableFrom,availableTo,userId);

        return this.http.post<{name:string}>('https://ionic-angular-249706.firebaseio.com/offered-places.json',{... newPlace, id:null})
        .pipe(
          switchMap(responseData=>{
            this.generatedId=responseData.name
            return this.places;
          }),take(1),
          tap(places=>{
             newPlace.id=this.generatedId;
             this._places.next(places.concat(newPlace))
          })
        );
        /* 
        .pipe(tap(responseData=>{
          console.log(responseData)
        })) */

        /* return this.places.pipe(take(1),delay(1000),tap(places=>{
          places= places.concat(newPlace);
          this._places.next(places)
        })
        ) */
      } 

      fetchData(){
        return this.http.get<{[key:string]:PlacesData}>('https://ionic-angular-249706.firebaseio.com/offered-places.json')
        .pipe(
          map(responseData=>{
            const places=[];
            for(const key in responseData){
              if(responseData.hasOwnProperty(key)){
                  places.push(new Place(key,responseData[key].title,
                    responseData[key].desc,responseData[key].imageUrl,responseData[key].price,
                    new Date(responseData[key].availableFrom),new Date(responseData[key].availableTo),responseData[key].userId))
              }
            }
            return places;
          }),tap(places=>{
            this._places.next(places);
          })



          
        );
      }

    updatePlace(placeId:string,title:string,description:string){
       let updatedPlaces:Place[];
         return this.places.pipe(take(1),
            switchMap(places=>{
              const updatedPlaceIndex = places.findIndex(p => p.id === placeId)
               updatedPlaces=[... places];
              const oldplace=places[updatedPlaceIndex];
                updatedPlaces[updatedPlaceIndex]=new Place(
                  oldplace.id,title,description,oldplace.imageUrl,oldplace.price,oldplace.availableFrom,oldplace.availableTo,oldplace.userId)
          
                  return this.http.put(`https://ionic-angular-249706.firebaseio.com/offered-places/${placeId}.json`, {...updatedPlaces[updatedPlaceIndex],id:null})
                }),tap(()=>{
                  this._places.next(updatedPlaces);
                })
          ); 
          /* let updatedPlaces: Place[];
          return this.places.pipe(
            take(1),
            switchMap(places => {
              const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
              updatedPlaces = [...places];
              const oldPlace = updatedPlaces[updatedPlaceIndex];
              updatedPlaces[updatedPlaceIndex] = new Place(
                oldPlace.id,
                title,
                description,
                oldPlace.imageUrl,
                oldPlace.price,
                oldPlace.availableFrom,
                oldPlace.availableTo,
                oldPlace.userId
              );
              return this.http.put(
                `https://ionic-angular-249706.firebaseio.com/offered-places/${placeId}.json`,
                { ...updatedPlaces[updatedPlaceIndex], id: null }
              );
            }),
            tap(() => {
              this._places.next(updatedPlaces);
            })
          ); */
        }
   
  constructor(private http:HttpClient) { }
}
  