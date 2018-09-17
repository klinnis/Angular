import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import { HttpClient } from '@angular/common/http';
import {nameValidators} from "./name.validators";



@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  path: any;
  recipes: any;
  done: any;


  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
              private router: Router, private http: HttpClient,
              private nameValidator: nameValidators) {
  }

  ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
           this.id = +params['id'];
           this.editMode = params['id'] != null;
           this.path = this.recipeService.getImagePath();
           this.getRecipeIngredients(this.id);
           this.initForm();
        }
    );
  }

    getSpecificProduct(id) {
        return this.http.get('http://lara.test/api/specificrecipe/' + id);
    }

    getRecipeIngredients(id) {
        return this.http.get('http://lara.test/api/recipe_ingredients/' + id);
    }



  onSubmit() {

     // const newRecipe = new Recipe (this.recipeForm.value['name'],
                                 //  this.recipeForm.value['description'],
                                  //  this.recipeForm.value['imagePath'],
                                  //  this.recipeForm.value['ingredients']);

     if (this.editMode) {
         this.recipeService.updateRecipe(this.id, this.recipeForm.value).subscribe(res => {});

     } else {

         this.recipeService.addRecipe(this.recipeForm.value).subscribe(res => {});

     }
this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onAddIngredient() {
      (<FormArray>this.recipeForm.get('ingredients')).push(
          new FormGroup({
              'name' : new FormControl(null, Validators.required),
              'amount' : new FormControl(null, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
          })
      );
  }

        get name() {
              return this.recipeForm.get('name');
        }



  private initForm() {


      if (this.editMode) {


          this.recipeForm = new FormGroup({

              name: new FormControl('',[
                      Validators.required,
                      Validators.minLength(4),
                      nameValidators.cannotContainSpace,
                  ],
                  this.nameValidator.shouldBeUnique.bind(this.nameValidator)),
              imagePath: new FormControl(''),
              description: new FormControl(),
              ingredients: new FormArray([])
          });

          let recipeData = null;
          this.getSpecificProduct(this.id).subscribe(
              data => {
                  recipeData = data
                  this.recipeForm.patchValue({
                      name: recipeData.name,
                      imagePath: recipeData.imagePath,
                      description: recipeData.description

                  })
              });
          let ingredientsData = null;
          this.getRecipeIngredients(this.id).subscribe(
              data => {
                  ingredientsData = data
                  if(ingredientsData!= null) {
                      for (let ingredient of ingredientsData){
                          (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
                              'name': new FormControl(ingredient.name, Validators.required),
                              'amount': new FormControl(ingredient.amount, [
                                  Validators.required,
                                  Validators.pattern(/^[1-9]+[0-9]*$/)
                              ])
                          }));
                  }
                  }

              }
          );




      }
      this.recipeForm = new FormGroup({
          'name' : new FormControl('',
              [Validators.required,
               Validators.minLength(4),
              nameValidators.cannotContainSpace,],
              this.nameValidator.shouldBeUnique.bind(this.nameValidator)),
          'imagePath' : new FormControl('', Validators.required),
          'description' : new FormControl('', Validators.required),
           ingredients: new FormArray([])


      });

  }


}




