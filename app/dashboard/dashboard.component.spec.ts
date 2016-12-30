import {RouterLinkStubDirective} from '../stub/routerLink-stub';
import { async, ComponentFixture, TestBed  } from '@angular/core/testing';

import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ModuleWithProviders} from '@angular/core';
//import { ROUTER_PROVIDERS} from '@angular/router';
import {Router} from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import {HeroService} from '../services/hero.service';
import {HeroSearchService} from '../services/hero-search.service';
import {HEROES} from '../mock-data/mock-heroes';
import {HeroSearchComponent} from '../heroes/search/hero-search.component';
import {Hero} from '../heroes/hero';

import {Observable} from 'rxjs/Observable';

describe('DashboardComponent', function () {
    let comp : DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let heroService : HeroService;
    let linksDes: DebugElement[];
    let links: RouterLinkStubDirective[];
    let heroSpy: jasmine.Spy;
    let de: DebugElement;
    let el : any;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas:[CUSTOM_ELEMENTS_SCHEMA], 
            declarations:[ DashboardComponent, RouterLinkStubDirective ],
            imports:[HttpModule],
            providers:[HeroService]
        })
        .overrideComponent(HeroSearchComponent,{
            set:{
                providers:[{provide:HeroSearchService, useValue:HeroSearchServiceSpy}, 
                           {provide:Router, useValue:MockRouter},                           
                          ]                
            }
        })
        //.overrideDirective(DashboardComponent,HeroSearchComponent, HeroSearchStub)
         .compileComponents()
         .then(()=> {
            fixture = TestBed.createComponent(DashboardComponent);
            comp = fixture.componentInstance;       
        });        
    }));

    beforeEach(()=> {             
        // fixture.detectChanges();        
        // linksDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
        // links = linksDes.map(link => link.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);   
        heroService = fixture.debugElement.injector.get(HeroService);
        heroSpy = spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(HEROES));        
        // de = fixture.debugElement.query(By.css('.grid'));     
        // el = de.nativeElement;
    });

    //  it('should get heroes to be set after OnInit', () => { 
    //      fixture.detectChanges();        
         
    //      expect(h4).toBe(comp.heroes);
    //  });

     it('should get heroes', async(()=> {
         fixture.detectChanges();
         fixture.whenStable().then(()=>{
             fixture.detectChanges();
             de = fixture.debugElement.query(By.css('.hero'));     
             el = de.nativeElement;
             expect(el.textContent.trim()).toBe('Narco');
         })
     }))

});

class HeroServiceSpy {
    getHeroes = jasmine.createSpy('getHeroes').and.callFake(()=> Promise.resolve(true).then(() => Object.assign({},HEROES)));
}

class MockRouter {
    navigate =  jasmine.createSpy('navigate');
}

class HeroSearchServiceSpy {
    search = jasmine.createSpy('search').and.callFake(
        () => Promise.resolve(true).then(()=> HEROES)
    );

}

@Component({ template:``})
class HeroSearchStub{

}