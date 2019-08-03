import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit, OnDestroy {
  recipeId: string;
  loadedRecipe: Recipe;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private recipesService: RecipesService,
              private alertController: AlertController, private zone: NgZone) { }

  ngOnInit() {

      this.activatedRoute.paramMap.subscribe(map => {
        if (!map.has('recipeId')) {
          return;
        }
        this.recipeId = map.get('recipeId');
        this.loadedRecipe = this.recipesService.getRecipe(this.recipeId);
        console.log(this.loadedRecipe);
      });
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillEnter() {
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

  goback() {
    this.zone.run(() => this.router.navigateByUrl('/recipes'));
  }
   deleteRecipe() {

    this.alertController.create({
      header: 'Are you sure?',
      message : 'Do you really want to delete recipe?',
      buttons: [
        {
          role : 'cancel',
          text : 'Cancel'
        },
        {
          role : 'delete',
          text : 'Delete',
          handler : () => {
            const recipes = this.recipesService.deleteRecipe(this.loadedRecipe.id);
            console.log(recipes);
            this.zone.run(() => this.router.navigateByUrl('/recipes'));
          }
        },
      ]
    }).then(alertEl => {
      alertEl.present();
    });

  }


}
