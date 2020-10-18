import { Ingredient } from 'src/app/shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService {
  //event emitter for when ingredients changed
  ingredientsChanged = new Subject<Ingredient[]>();

  //array of ingredients
  private ingredients: Ingredient[] = [
     //new Ingredient('Apples', 5),
     //new Ingredient('Tomatos', 10)
  ];


  getIngredients() {
    return this.ingredients.slice()
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
    console.log('CLICKED TO ADD ITEM: ', ingredient);
  }
}
