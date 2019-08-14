import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrls: ['./createbooking.component.scss'],
})
export class CreatebookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f',{static: true}) form:NgForm
  constructor(private modalCntrl:ModalController) { }
  startDate:string;
  endDate:string;


  ngOnInit() {
      console.log(this.selectedMode);
      const availableFrom=new Date(this.selectedPlace.availableFrom);
      const availableTo=new Date(this.selectedPlace.availableTo);
      
      if(this.selectedMode === 'random'){
          this.startDate= new Date(availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 
            - availableFrom.getTime())
            ).toISOString();
          this.endDate= new Date(new Date(this.startDate).getTime() +
          Math.random() * (new Date(this.startDate).getTime() +
            6*24*60*60*1000 - new Date(this.startDate).getTime())
          ).toISOString();
      }



   }


   onBookPlace() {
      if(!this.form.valid || !this.onDateValid){
        return;
      }


    this.modalCntrl.dismiss({bookingDetails :{
      
      firstname:this.form.value['first-name'],
      lastname:this.form.value['last-name'],
      noofguest:+this.form.value['noOfGuests'],
      startDate:new Date(this.form.value['from-date']),
      endDate:new Date(this.form.value['to-date']),
    } },'booked')
  }

  onCancel() {
    this.modalCntrl.dismiss(null,'cancel');
  }

  onDateValid(){
    const startDate=new Date(this.form.value['from-date']);
    const endDate=new Date(this.form.value['to-date']);
      return endDate>startDate;
  }
}

