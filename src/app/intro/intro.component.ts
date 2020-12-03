import { Component } from '@angular/core'
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent  {

  constructor(private bottomSheetRef: MatBottomSheetRef<IntroComponent>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
