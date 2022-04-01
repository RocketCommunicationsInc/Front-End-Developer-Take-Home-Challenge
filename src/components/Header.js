import {
    RuxGlobalStatusBar,
    RuxClock,
} from '@astrouxds/react'

export const Header = () => {
    return (
        <header>
            <RuxGlobalStatusBar app-domain="GRM" app-name="Dashboard" app-version="1.0A">
                <RuxClock />
            </RuxGlobalStatusBar>
        </header>
    )
}