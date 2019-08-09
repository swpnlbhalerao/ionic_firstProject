import { Injectable } from '@angular/core';
import { Booking } from './booking.modal';


@Injectable({ providedIn: "root" })
export class BookingsService {

    private _bookings: Booking[] = [
        {
            Id: 'abc',
            placeId: 'p1',
            placeTitle: 'South Mumbai',
            guestNo: 3,
            userId: 'xyz',
        }
    ]

    getBookings() {
        return [... this._bookings]
    }

}