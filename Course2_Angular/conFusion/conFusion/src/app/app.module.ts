import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// NgModule decorator
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


/* Class Notes, June 12, 2018
 *
 * Angular Architecture
 *
 * Root Modular (aka. AppModule)
 *
 *
 *
 */
