import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//we need to explicitly import angular forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//our components
import { AppComponent } from './app.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { ReactiveComponent } from './reactive/reactive.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateDrivenComponent,
    ReactiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
