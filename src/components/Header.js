import { RuxGlobalStatusBar } from '@astrouxds/astro-web-components/dist/components/rux-global-status-bar'
import { RuxClock } from '@astrouxds/astro-web-components/dist/components/rux-clock';
customElements.define('rux-global-status-bar', RuxGlobalStatusBar)
customElements.define('rux-clock', RuxClock)

export const Header = () => {
    return (
        <header>
            <rux-global-status-bar app-domain="GRM" app-name="Dashboard" app-version="1.0A">
                <rux-clock />
            </rux-global-status-bar>
        </header>
    )
}