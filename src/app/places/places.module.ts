import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PlacesPage } from './places.page';
import { PlaceDetailsModule } from './places-routing.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PlaceDetailsModule
  ],
  declarations: [PlacesPage]
})
export class PlacesPageModule {}
