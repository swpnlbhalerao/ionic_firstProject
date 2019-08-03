import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipes.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit , OnDestroy{

  recipes: Recipe[] ;


  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    console.log('noOninit');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
    console.log('ionViewWillEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }
  ngOnDestroy(){
    console.log('ngOndestroy');
  }
}
