import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from './shoppinglist.service'
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private subIngredient: Subscription;

  constructor(private shoppinglistService: ShoppingListService ) { }

  ngOnInit(): void {
    this.ingredients = this.shoppinglistService.getIngredients();
    this.subIngredient = this.shoppinglistService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.subIngredient.unsubscribe();
  }

  onEditIngredient(i: number) {
    this.shoppinglistService.startedEditIndex.next(i);
  }
}
