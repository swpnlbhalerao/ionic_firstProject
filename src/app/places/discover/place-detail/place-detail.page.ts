import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreatebookingComponent } from '../../../bookings/createbooking/createbooking.component'
import { BookingsService } from '../../../bookings/bookingsService';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  placesSub: Subscription;
  isBookable:boolean=false
  constructor(private route: ActivatedRoute, private placesService: PlacesService, private navCntrl: NavController,
    private modalCntrl: ModalController, private actionSheetCntrl: ActionSheetController,private bookingService:BookingsService
    ,private router:Router,private loadingCntrl:LoadingController,private authService:AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      if (!params.get('placeId')) {
        this.navCntrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.placesSub = this.placesService.getPlace(params.get('placeId')).subscribe(place => {
        this.place = place;
          if(this.place.userId !== this.authService.userId){
            this.isBookable=true;
          }
      });
    })
  }

  onBookPlace() {
    this.actionSheetCntrl.create({
      header: 'select action type',
      buttons: [{
        text: 'Select Date',
        handler: () => {
          this.onModeSelect('select')
        },
        role: 'select',
        icon: 'create'
      },
      {
        text: 'Random Date',
        handler: () => {
          this.onModeSelect('random')
        },
        role: 'random',
        icon: 'shuffle'
      },
      {
        text: 'Cancel',
        role: 'cancel',
        icon: 'trash'
      }
      ]

    }).then(actionSheetEl => {
      actionSheetEl.present();
    })
  }

  onModeSelect(mode: 'select' | 'random') {
    this.modalCntrl.create({ component: CreatebookingComponent, componentProps: { selectedPlace: this.place, selectedMode: mode } }).then(
      modalEl => {
        modalEl.present();
        modalEl.onDidDismiss().then(result => {
         // console.log(result.data.bookingDetails)
       
          if (result.role !== 'cancel') {
            const bookingDetails=result.data.bookingDetails;
            this.loadingCntrl.create({
              message :'booking place ..'
            }).then(loadingEl=>{
              loadingEl.present()
              this.bookingService.addBooking('',this.place.id,
              this.place.title,this.place.imageUrl,'',bookingDetails.firstname,bookingDetails.lastname,bookingDetails.noofguest,
              bookingDetails.startDate,bookingDetails.endDate).subscribe(()=>{
                console.log('success');
                loadingEl.dismiss();
                this.router.navigateByUrl('/bookings');
              })
            })
          
            /* console.log("Booked !!") */
           

          }
        })
      }
    )
  }
  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

}
