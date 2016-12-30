import { AppComponent } from './app.component';
import { RouterLinkStubDirective } from './stub/routerLink-stub';
//import { RouterOutletStubDirective } from './testing/routerOutlet-stub';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


describe('AppComponent', function () {
  let de: DebugElement;
  let linkDes: DebugElement[];
  let links: RouterLinkStubDirective[];
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ 
      schemas:[CUSTOM_ELEMENTS_SCHEMA],     
      declarations: [ AppComponent, RouterLinkStubDirective ]      
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance
    });
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(AppComponent);
    // comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
    fixture.detectChanges();

    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));

    links = linkDes.map(link => link.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should have expected title text', () => {
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch('Tour of Heroes');
  });

  it('should get routerLink from component',()=> {
    expect(links.length).toBe(2, 'should have 2 links');
  });

  it('can click on heroes link', () => {
    const heroeslinkDe = linkDes[1];
    const heroresLink = links[1];
    heroeslinkDe.triggerEventHandler('click',null);
    fixture.detectChanges();
    expect(heroresLink.navigateTo).toBe('/heroes');
  });

});
