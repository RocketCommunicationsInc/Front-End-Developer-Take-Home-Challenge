import { ChangeDetectionStrategy, Component } from '@angular/core';
import '@astrouxds/rux-global-status-bar/rux-global-status-bar.js';
import '@astrouxds/rux-clock/rux-clock.js';
import '@astrouxds/rux-status';
import '@astrouxds/rux-icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'libracornViewer';

}
