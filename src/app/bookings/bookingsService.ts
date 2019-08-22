import { Injectable } from '@angular/core';
import { Booking } from './booking.modal';
import { BehaviorSubject } from 'rxjs';
import { take, tap, delay, switchMap,map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service'
import { HttpClient } from '@angular/common/http';

interface BookingData {

bookingFrom: string,
bookingTo: string,
firstName: string,
guestNo: number,
lastName: string,
placeId: string,
placeImageUrl: string,
placeTitle: string,
userId: string,


}

@Injectable({ providedIn: "root" })
export class BookingsService {

    constructor(private authService: AuthService,private http:HttpClient){

    }

    private _bookings  = new BehaviorSubject<Booking[]>([]);
    generatedId:string;

    get bookings() {
        return this._bookings.asObservable();
    }


    addBooking(id:string,placeId:string,placeTitle:string,placeImage,userId:string,firstName:string,lastName:string,noOfGuest:number,bookingFrom:Date,bookingTo:Date){
        let generatedId: string;
        let newBooking: Booking;
        return this.authService.userId.pipe(
          take(1),
          switchMap(userId => {
            if (!userId) {
              throw new Error('No user id found!');
            }
          
            newBooking = new Booking(
              Math.random().toString(),
              placeId,
              placeTitle,
              placeImage,
              firstName,
              lastName,
              noOfGuest,
              bookingFrom,
              bookingTo,userId
            );
            return this.http.post<{ name: string }>(
              'https://ionic-angular-249706.firebaseio.com/bookings.json',
              { ...newBooking, id: null }
            );
          }),
          switchMap(resData => {
            generatedId = resData.name;
            return this.bookings;
          }),
          take(1),
          tap(bookings => {
            newBooking.Id = generatedId;
            this._bookings.next(bookings.concat(newBooking));
          })
        );
    }

    cancelBooking(bookingId:string){
        return this.http.delete(`https://ionic-angular-249706.firebaseio.com/bookings/${bookingId}.json`)
        .pipe(
            switchMap(responseData=>{
                return this.bookings
            }),take(1),
            tap(bookingPlaces=>{
            bookingPlaces=bookingPlaces.filter(booking=> booking.Id !== bookingId)
            this._bookings.next(bookingPlaces);  
            })
        )
    }

    fetchBooking(){
   // return this.http.get<{[key:string]: BookingData }>(`https://ionic-angular-249706.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`)
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error('User not found!');
        }
        return this.http.get<{ [key: string]: BookingData }>(
          `https://ionic-angular-249706.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${userId}"`
        );
      }),
      map(respData => {
        const bookings = [];
        for (const key in respData) {
          if (respData.hasOwnProperty(key)) {
            bookings.push(new Booking(key,respData[key].placeId,
                            respData[key].placeTitle,respData[key].placeImageUrl,respData[key].firstName,respData[key].lastName,
                            respData[key].guestNo,new Date(respData[key].bookingFrom),new Date(respData[key].bookingTo),respData[key].userId))
          
          }
        }
        return bookings;
      }),
      tap(bookings => {
        this._bookings.next(bookings);
      })
    );   
    /* .pipe(
        map(respData=>{
            const bookings=[];
                for(let key in respData){
                    if(respData.hasOwnProperty(key)){
                        bookings.push(new Booking(key,respData[key].placeId,
                            respData[key].placeTitle,respData[key].placeImageUrl,respData[key].firstName,respData[key].lastName,
                            respData[key].guestNo,new Date(respData[key].bookingFrom),new Date(respData[key].bookingTo),respData[key].userId))
                    }
                }
            return bookings;
        }),tap(bookings=>{
            console.log(bookings);
            this._bookings.next(bookings);
        })
    ) */
    }
}