import { Component, OnInit } from '@angular/core';
import { Booking } from './booking.modal';
import { BookingsService } from './bookingsService';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  constructor(private bookingsService:BookingsService) { }
  loadedBookings:Booking[];
  ngOnInit() {

    this.loadedBookings=this.bookingsService.getBookings();
  }

  CancelBooking(bookingId:string,slideEl:IonItemSliding){
    slideEl.close();
  }


}
