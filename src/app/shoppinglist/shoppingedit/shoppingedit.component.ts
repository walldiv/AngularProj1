import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

import {Ingredient} from 'src/app/shared/ingredient.model'
import {ShoppingListService} from '../shoppinglist.service';

@Component({
  selector: 'app-shoppingedit',
  templateUrl: './shoppingedit.component.html',
  styleUrls: ['./shoppingedit.component.css']
})
export class ShoppingeditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  private startedEditIndexSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit(): void {
    this.startedEditIndexSubscription = this.shoppinglistService.startedEditIndex.subscribe( (index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppinglistService.getIngredient(index);
      this.ingredientForm.setValue({name: this.editedItem.name, amount: this.editedItem.amount});
    })
  }

  ngOnDestroy(): void {
    this.startedEditIndexSubscription.unsubscribe();
  }

  onAddIngredient(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.shoppinglistService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppinglistService.addIngredient(newIngredient);
    }
    console.log(form);
    this.onClearForm();
  }

  onClearForm() {
    this.ingredientForm.reset();
    this.editMode = false;
    this.editedItemIndex = null;
    this.editedItem = null;
  }

  onDeleteIngredient() {
    if(this.editedItem != null) {
      this.shoppinglistService.deleteIngredient(this.editedItemIndex);
      this.onClearForm();
    }
  }
}
