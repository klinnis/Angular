import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';


@Injectable()
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription;
  recipesall: any;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              ) {



}



  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
    );

      this.recipeService.getRecipes1().subscribe(res => this.recipesall = res);


  }





  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }




}
