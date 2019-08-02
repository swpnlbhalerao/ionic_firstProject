import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  recipes: Recipe[] ;


  constructor(private recipesService:RecipesService) { }

  ngOnInit() {
    console.log("this.recipes");
    this.recipes= this.recipesService.getRecipes();
  }

}
