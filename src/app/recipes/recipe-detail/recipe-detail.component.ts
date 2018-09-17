import {Component, OnInit, Injectable} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable()
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;
  recipe1: any;
  images: any;
  ingredients1: any;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) { 
                
                
              }

  ngOnInit() {
    
    this.route.params.subscribe(
        (params: Params) => {
         this.id = +params['id'];
         this.recipeService.getSpecificProduct(this.id).subscribe(res => this.recipe1 = res);
         this.images= this.recipeService.getImagePath();
         this.getRecipeIngredients(this.id);
        }
    );
   
  }


  getRecipeIngredients(id) {
    return this.http.get('http://lara.test/api/recipe_ingredients/' +id).subscribe(
        ingredients => {
         this.ingredients1= ingredients;
        }
    );
}




  onEditRecipe() {
      // this.router.navigate(['edit'], {relativeTo: this.route });
      this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onAddToShoppingList() {
     this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  ondeleteRecipe() {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['/recipes']);
  }

}
