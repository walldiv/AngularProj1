import { Ingredient } from 'src/app/shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService {
  //event emitter for when ingredients changed
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditIndex = new Subject<number>();

  //array of ingredients
  private ingredients: Ingredient[] = [
  ];


  getIngredients() {
    return this.ingredients.slice()
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
    console.log('CLICKED TO ADD ITEM: ', ingredient);
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
    console.log('DELETED ITEM SUCCESSFULLY! - ' + this.ingredients);
  }
}
