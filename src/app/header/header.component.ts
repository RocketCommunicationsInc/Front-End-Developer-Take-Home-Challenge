import { Component } from '@angular/core'
import { ThemePalette } from '@angular/material/core'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { IntroComponent } from '../intro/intro.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MatBottomSheet]
})
export class HeaderComponent {
  links = ['alerts', 'contacts']
  activeLink = this.links[0]
  background: ThemePalette

  constructor(private bottomSheet: MatBottomSheet) { }

  openBottomSheet(){
    this.bottomSheet.open(IntroComponent);
  }

}
