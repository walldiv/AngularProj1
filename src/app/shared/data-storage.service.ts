import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap, take, exhaustMap} from 'rxjs/operators';
import {AuthService} from '../auth/auth-request.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authSvc: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-course-recipebook-f757e.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {console.log});
  }

  fetchRecipes() {
    return this.authSvc.loggedUser.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(
          'https://ng-course-recipebook-f757e.firebaseio.com/recipes.json',
          {params: new HttpParams().set('auth', user.token)}
        )
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap(recipes => {console.log(recipes); this.recipeService.setRecipes(recipes);})
    )
  }
}
