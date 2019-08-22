import { Injectable } from '@angular/core';
import { Place } from './place.model'
import { BehaviorSubject,of } from 'rxjs';
import { take, map, tap,delay, switchMap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { PlaceLocation } from './location.model';
import { AuthService } from '../auth/auth.service';


interface PlacesData{
  availableFrom: Date,
  availableTo:Date,
  desc: string,
  imageUrl: string,
  price: number
  title: string,
  userId: string,
  location: PlaceLocation;
 } 


@Injectable({
  providedIn: 'root'
})

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
            ,new Date(responseData.availableFrom),new Date(responseData.availableTo),
            responseData.userId,responseData.location);
      }));
    
    
      /*  return  this.places.pipe(take(1),map(places=>{
          return places.find(place=>{
          return place.id === id;
        }) 
      })) */
    }

    uploadImage(image: File) {
      const uploadData = new FormData();
      uploadData.append('image', image);
  
      return this.http.post<{imageUrl: string, imagePath: string}>(
        'https://us-central1-ionic-angular-249706.cloudfunctions.net/storeImage',
        uploadData
      );
    }
    addPlace(title: string,desc: string,imageUrl: string,price: Number,availableFrom:Date,
      availableTo:Date, location: PlaceLocation) {
       let generatedId: string;
        let newPlace: Place;
        return this.authService.userId.pipe(
          take(1),
          switchMap(userId => {
            if (!userId) {
              throw new Error('No user found!');
            }
            newPlace = new Place(
              Math.random().toString(),
              title,
              desc,
              imageUrl,
              price,
              availableFrom,
              availableTo,
              userId,
              location
            );
            return this.http.post<{ name: string }>(
              'https://ionic-angular-249706.firebaseio.com/offered-places.json',
              {
                ...newPlace,
                id: null
              }
            );
          }),
          switchMap(resData => {
            generatedId = resData.name;
            return this.places;
          }),
          take(1),
          tap(places => {
            newPlace.id = generatedId;
            this._places.next(places.concat(newPlace));
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
                    new Date(responseData[key].availableFrom),new Date(responseData[key].availableTo),
                    responseData[key].userId ,responseData[key].location))
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
            if(!places || places.length<=0){
              return this.fetchData();
            }else{
              return of(places);
            }
          }),
            switchMap(places=>{
              const updatedPlaceIndex = places.findIndex(p => p.id === placeId)
               updatedPlaces=[... places];
              const oldplace=places[updatedPlaceIndex];
                updatedPlaces[updatedPlaceIndex]=new Place(
                  oldplace.id,title,description,oldplace.imageUrl,oldplace.price,oldplace.availableFrom,oldplace.availableTo,oldplace.userId,oldplace.location)
          
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
   
        constructor(private authService: AuthService, private http: HttpClient) {}
}
  