import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RecipeService {

recipesChanged = new Subject<Recipe[]>();

   private recipes: Recipe[] = [
        new Recipe('A test Recipe',
            'This is a test',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [new Ingredient('Meat', 1),
        new Ingredient('Fries', 20)]),
        new Recipe('A New Recipe',
            'This is a new Test',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [new Ingredient('Buns', 2),
                new Ingredient('Meat', 20)])

    ];

   constructor(private slService: ShoppingListService) {
   }

   getRecipes() {
       return this.recipes.slice();
   }

   getRecipe(index: number) {
      return this.recipes[index];
   }

   addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.slService.addIngredients(ingredients);
   }

   addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
   }

   updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
       this.recipesChanged.next(this.recipes.slice());

   }

   deleteRecipe(index: number) {
       this.recipes.splice(index, 1);
       this.recipesChanged.next(this.recipes.slice());
   }
}
