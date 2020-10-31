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

  recipes: Recipe[];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesSubj.next(this.recipes.slice());
  }

  getRecipes() {
    return (this.recipes != null) ? this.recipes.slice() : this.recipes;
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
