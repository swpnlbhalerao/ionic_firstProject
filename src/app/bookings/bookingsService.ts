import { Injectable } from '@angular/core';
import { Booking } from './booking.modal';
import { BehaviorSubject } from 'rxjs';
import { take, tap, delay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service'


@Injectable({ providedIn: "root" })
export class BookingsService {

    constructor(private authService: AuthService){

    }

    private _bookings  = new BehaviorSubject<Booking[]>([]);
    

    get Bookings() {
        return this._bookings.asObservable();
    }


    addBooking(id:string,placeId:string,placeTitle:string,placeImgUrl,userId:string,firstName:string,lastName:string,noOfGuest:number,bookingFrom:Date,bookingTo:Date){
       return this._bookings.pipe(take(1),delay(1000),tap(bookingPlaces=>{
            bookingPlaces.push(new Booking(Math.random().toString(),placeId,placeTitle,placeImgUrl,
            firstName,lastName,noOfGuest,bookingFrom,bookingTo,this.authService.userId) )
            this._bookings.next(bookingPlaces);    
        }))
        
    }

    cancelBooking(bookingId:string){
        return this._bookings.pipe(take(1),delay(1000),tap(bookingPlaces=>{
            bookingPlaces=bookingPlaces.filter(booking=> booking.Id !== bookingId)
            console.log(bookingPlaces);
            this._bookings.next(bookingPlaces);    
        }))
    }


}