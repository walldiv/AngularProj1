import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Ingredient} from 'src/app/shared/ingredient.model'
import {ShoppingListService} from '../shoppinglist.service';

@Component({
  selector: 'app-shoppingedit',
  templateUrl: './shoppingedit.component.html',
  styleUrls: ['./shoppingedit.component.css']
})
export class ShoppingeditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInput: ElementRef;

  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddIngredient() {
    const newIngredient = new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value);
    this.shoppinglistService.addIngredient(newIngredient);
  }
}
