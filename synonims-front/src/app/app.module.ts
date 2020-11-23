import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SynonymsFindComponent } from './synonyms-find/synonyms-find.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, } from "@angular/material/form-field"
import { MatButtonModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatSnackBarModule, MatToolbarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { AddWordComponent } from './add-word/add-word.component';
import { SynonymsListComponent } from './synonyms-list/synonyms-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddSynonimsComponent } from './add-synonims/add-synonims.component';

@NgModule({
  declarations: [
    AppComponent,
    SynonymsFindComponent,
    AddWordComponent,
    SynonymsListComponent,
    AddSynonimsComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatGridListModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2000,
        horizontalPosition: "end",
        verticalPosition: "bottom",
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
