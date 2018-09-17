import {Recipe} from './recipe.model';
import { Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';
import {HttpClient} from "@angular/common/http";




@Injectable()
export class RecipeService {

recipesChanged = new Subject<Recipe[]>();

   // private changes = new BehaviorSubject<any>('');
    //cast= this.changes.asObservable();


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


   Images: any = '../assets/';




 
    constructor(private slService: ShoppingListService,
                private http: HttpClient) {

   }


    getRecipes1() {
        // console.log('Get Products and Update Table');
       return this.http.get('http://lara.test/api/recipes');

    }

    getSpecificProduct(id: number) {
         return this.http.get('http://lara.test/api/specificrecipe/' + id);


    }

    checkName(name: string) {
        // console.log('Get Products and Update Table');
        return this.http.get('http://lara.test/api/recipe/' +name);

    }




getImagePath() {
   return this.Images;
}


   addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.slService.addIngredients(ingredients);
   }

   addRecipe(formvalue1: any) {

       return this.http.put('http://lara.test/api/recipe_nea/' + '', formvalue1);
   }

   updateRecipe(index: number, newRecipe: any) {

      return this.http.put('http://lara.test/api/recipe_up/' + index, newRecipe);

   }

   deleteRecipe(index: number) {
       this.recipes.splice(index, 1);
       this.recipesChanged.next(this.recipes.slice());
   }
}
