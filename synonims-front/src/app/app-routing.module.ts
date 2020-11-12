import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddWordComponent } from './add-word.component.ts/add-word.component';
import { SynonymsFindComponent } from './synonyms-find/synonyms-find.component';

const routes: Routes = [
  { path: "word", component: SynonymsFindComponent },
  { path: "", pathMatch: 'full', redirectTo: "word" },
  { path: "add", component: AddWordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
