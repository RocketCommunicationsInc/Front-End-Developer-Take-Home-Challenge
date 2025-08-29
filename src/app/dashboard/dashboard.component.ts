import { Component } from '@angular/core';
import { RuxButton } from '@astrouxds/astro-web-components/dist/components/rux-button';
import { RuxContainer } from '@astrouxds/astro-web-components/dist/components/rux-container';
import { RuxCard } from '@astrouxds/astro-web-components/dist/components/rux-card';
import { RuxTable } from '@astrouxds/astro-web-components/dist/components/rux-table';
import { RuxTableHeader } from '@astrouxds/astro-web-components/dist/components/rux-table-header';
import { RuxTableHeaderRow } from '@astrouxds/astro-web-components/dist/components/rux-table-header-row';
import { RuxTableHeaderCell } from '@astrouxds/astro-web-components/dist/components/rux-table-header-cell';
import { RuxTableBody } from '@astrouxds/astro-web-components/dist/components/rux-table-body';
import { RuxTableRow } from '@astrouxds/astro-web-components/dist/components/rux-table-row';
import { RuxTableCell } from '@astrouxds/astro-web-components/dist/components/rux-table-cell';
import { RuxDialog } from '@astrouxds/astro-web-components/dist/components/rux-dialog.js';
import { RuxInput } from '@astrouxds/astro-web-components/dist/components/rux-input.js';
import { RuxGlobalStatusBar } from '@astrouxds/astro-web-components/dist/components/rux-global-status-bar';
import { RuxStatus } from '@astrouxds/astro-web-components/dist/components/rux-status';
import { RuxSwitch } from '@astrouxds/astro-web-components/dist/components/rux-switch';
import { RuxIcon } from '@astrouxds/astro-web-components/dist/components/rux-icon';
import { RuxIconClose } from '@astrouxds/astro-web-components/dist/components/rux-icon-close';
import { RuxSelect } from '@astrouxds/astro-web-components/dist/components/rux-select';
import { RuxOption } from '@astrouxds/astro-web-components/dist/components/rux-option';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
customElements.define('rux-button', RuxButton);
customElements.define('rux-container', RuxContainer);
customElements.define('rux-card', RuxCard);
customElements.define('rux-table', RuxTable);
customElements.define('rux-table-header', RuxTableHeader);
customElements.define('rux-table-header-row', RuxTableHeaderRow);
customElements.define('rux-table-header-cell', RuxTableHeaderCell);
customElements.define('rux-table-body', RuxTableBody);
customElements.define('rux-table-row', RuxTableRow);
customElements.define('rux-table-cell', RuxTableCell);
customElements.define('rux-dialog', RuxDialog);
customElements.define('rux-input', RuxInput);
customElements.define('rux-global-status-bar', RuxGlobalStatusBar);
customElements.define('rux-status', RuxStatus);
customElements.define('rux-switch', RuxSwitch);
customElements.define('rux-icon', RuxIcon);
customElements.define('rux-icon-close', RuxIconClose);
customElements.define('rux-select', RuxSelect);
customElements.define('rux-option', RuxOption);
