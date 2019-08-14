import { Component, OnInit, OnDestroy } from '@angular/core';
import { Booking } from './booking.modal';
import { BookingsService } from './bookingsService';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit ,OnDestroy {
bookingsSub:Subscription;
cancelBookingSub:Subscription;

  constructor(private bookingsService:BookingsService,private loadingCntrl:LoadingController) { }
  loadedBookings:Booking[];
  ngOnInit() {

    this.bookingsSub=this.bookingsService.Bookings.subscribe((myBookings)=>{
      this.loadedBookings=myBookings;
    });
  }

  cancelBooking(bookingId:string,slideEl:IonItemSliding){
    slideEl.close();
    this.loadingCntrl.create({
      message:'deleting booking ..'
    }).then(loadingEl=>{
      loadingEl.present();
      this.cancelBookingSub=this.bookingsService.cancelBooking(bookingId).subscribe(()=>{
        loadingEl.dismiss();
      });
    })
    

  }

  ngOnDestroy(){
    if(this.bookingsSub){
      this.bookingsSub.unsubscribe();
    }
    if(this.cancelBookingSub){
      this.cancelBookingSub.unsubscribe();
    }
  }
}
