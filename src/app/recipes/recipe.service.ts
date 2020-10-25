import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import { Recipe } from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shoppinglist/shoppinglist.service';

@Injectable()
export class RecipeService {
  recipesSubj = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {
  }

  recipes: Recipe[] = [
    new Recipe('Tacos', 'Carne Asada Tacos', 'https://www.goya.com/media/4124/carne-asada-tacos1.jpg',
    [
      new Ingredient('White Corn Tortillas', 1), new Ingredient('Skirt Steak Marinated', 1),
      new Ingredient('Avacados', 1), new Ingredient('Monterey Jack Cheese', 1)
    ]),
    new Recipe('Meatloaf', 'Italian at its finest!', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2010/4/13/0/GC_good-eats-meatloaf_s4x3.jpg.rend.hgtvcom.826.620.suffix/1380061114628.jpeg',
    [
      new Ingredient('Ground Chuck', 1), new Ingredient('Onions', 1),
      new Ingredient('Eggs', 1), new Ingredient('Seasoning', 1)
    ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesSubj.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesSubj.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesSubj.next(this.recipes.slice());
  }

  sendToShoppingList(ingredients: Ingredient[]) {
    for(let e of ingredients) {
      this.shoppingListService.addIngredient(e);
    };
  }
}
