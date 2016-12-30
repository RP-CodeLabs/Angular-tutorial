import './extensions/rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './data/in-memory-data.service';

import { AppComponent }  from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './heroes/detail/hero-detail.component'
import { HeroService } from './services/hero.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HeroSearchComponent} from './heroes/search/hero-search.component';

import { AppRoutingModule }  from './routing/app-routing.module';

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, InMemoryWebApiModule.forRoot(InMemoryDataService), AppRoutingModule ],
  declarations: [ AppComponent, DashboardComponent, HeroDetailComponent, HeroesComponent, HeroSearchComponent ],
  providers: [HeroService],
  bootstrap: [ AppComponent ]
})


export class AppModule { }
