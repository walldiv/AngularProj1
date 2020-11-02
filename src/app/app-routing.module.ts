import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { RecipesComponent } from './recipes/recipes.component';
import {RecipedetailComponent} from './recipes/recipedetail/recipedetail.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import {RecipesResolverService} from './recipes/recipes-resolver.service';
import {AuthComponent} from './auth/auth.component';
import {AuthGuardService} from './auth/auth-guard.service';


const appRoutes: Routes = [
  {path: '', redirectTo: '/recipe', pathMatch: 'full'},
  {path: 'recipe', component: RecipesComponent, canActivate: [AuthGuardService], children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipedetailComponent, resolve: [RecipesResolverService]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
  ]},
  {path: 'shoppinglist', component: ShoppinglistComponent},
  {path: 'auth', component: AuthComponent}
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
