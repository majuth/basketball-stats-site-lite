import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from  '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';




import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyComponent } from './body/body.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PlayerComponent } from './player/player.component';
import { TeamComponent } from './team/team.component';
import { AboutComponent } from './about/about.component';
import { DataService } from './data.service';
import { PlayerpicService } from './playerpic.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    HomepageComponent,
    PlayerComponent,
    TeamComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [DataService, PlayerpicService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
