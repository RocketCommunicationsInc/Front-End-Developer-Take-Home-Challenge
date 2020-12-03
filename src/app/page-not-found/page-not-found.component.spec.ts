import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { PageNotFoundComponent } from './page-not-found.component'

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent
  let fixture: ComponentFixture<PageNotFoundComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ]
    })
    .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  });

  it('should render 404 message in an h1 tag', () => {
    const fixture = TestBed.createComponent(PageNotFoundComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('h1').textContent).toContain(component.message)
  })

});
