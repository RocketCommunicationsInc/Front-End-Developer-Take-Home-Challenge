import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HeaderComponent } from './header.component'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
    })
    .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should have an alerts and contacts nav links', () => {
    fixture = TestBed.createComponent(HeaderComponent)
    const aTags = fixture.nativeElement.querySelectorAll('a')
    fixture.detectChanges()
    expect(aTags).not.toBe(null)
  })

})
