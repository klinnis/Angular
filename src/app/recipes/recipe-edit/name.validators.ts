import {AbstractControl, ValidationErrors} from "@angular/forms";
import {RecipeService} from '../recipe.service';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

@Injectable()
export class nameValidators {

    res: any;

    constructor(private recipeService: RecipeService) {

    }


    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') != -1)
            return {cannotContainSpace: true};

        return null;
    }

    shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

             this.recipeService.checkName(control.value).subscribe(res => {
                   this.res = res;
                 if(this.res!= null){
                     resolve({shouldBeUnique: true});
                 }else{
                     resolve(null);
                 }

              });



            }, 3000)



        })

    }

}