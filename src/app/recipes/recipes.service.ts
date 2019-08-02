import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor() { }
  recipes: Recipe[] = [
    { id : '1',
    title: 'French Fries',
    imageUrl :'https://cms.splendidtable.org/sites/default/files/styles/w2000/public/french-fries.jpg?itok=FS-YwUYH',
    ingredients : ['pototes','oil']
    },{ id : '2',
    title: 'Cake',
    imageUrl :'https://cms.splendidtable.org/sites/default/files/styles/w2000/public/french-fries.jpg?itok=FS-YwUYH',
    ingredients : ['wheat','oil']
    }
];

  getRecipes(){
    return [...this.recipes];
  }

  getRecipe(recipeId){
    return { ...this.recipes.find( recipe=>{
      return recipe.id === recipeId
    })}
  }

  deleteRecipe(recipeId){
      return this.recipes=this.recipes.filter(recipe=>{
      return recipe.id !== recipeId 
    });
  }

}
