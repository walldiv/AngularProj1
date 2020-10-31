import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { RecipesComponent } from './recipes/recipes.component';
import {RecipedetailComponent} from './recipes/recipedetail/recipedetail.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import {RecipesResolverService} from './recipes/recipes-resolver.service';


const appRoutes: Routes = [
  {path: '', redirectTo: '/recipe', pathMatch: 'full'},
  {path: 'shoppinglist', component: ShoppinglistComponent},
  {path: 'recipe', component: RecipesComponent, children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipedetailComponent, resolve: [RecipesResolverService]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
  ]}
];

@NgModule ({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
