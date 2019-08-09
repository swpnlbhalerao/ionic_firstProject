import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreatebookingComponent } from '../../../bookings/createbooking/createbooking.component'

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  constructor(private route: ActivatedRoute, private placesService: PlacesService, private navCntrl: NavController,
    private modalCntrl: ModalController,private actionSheetCntrl:ActionSheetController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      if (!params.get('placeId')) {
        this.navCntrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(params.get('placeId'));
    })
  }

  onBookPlace() {
      this.actionSheetCntrl.create({
         header : 'select action type',
         buttons :[{
          text : 'Select Date',
          handler:()=>{
              this.onModeSelect('select')
          },
          role : 'select',
          icon : 'create'
           },
           {
            text : 'Random Date',
            handler:()=>{
              this.onModeSelect('random')
            },
            role : 'random',
            icon : 'shuffle'
             },
             {
              text : 'Cancel',
              role : 'cancel',
              icon : 'trash'
               }
        ]
        
        }).then(actionSheetEl=>{
          actionSheetEl.present();
        })
  }

onModeSelect(mode :'select' | 'random'){
  this.modalCntrl.create({ component: CreatebookingComponent, componentProps: { selectedPlace: this.place,selectedMode :mode } }).then(
    modalEl => {
      modalEl.present();
      modalEl.onDidDismiss().then(result => {
        console.log(result)
        if (result.role !== 'cancel') {
          console.log("Booked !!")
        }
      })
    }
  )
}


}
