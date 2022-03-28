import { RuxClock, RuxGlobalStatusBar,RuxIcon, RuxMonitoringIcon } from '@astrouxds/react'
import './Header.css'

const Header = () => {
  return (
    <div className='Header-container'>
      <div className='header-logo-cell'>
        <RuxGlobalStatusBar 
        className='status-bar'
        appDomain='grm' 
        appName='Dashboard' 
        menuIcon='apps'
        includeIcon='true'
        username='K. Sarchi'
        />
        {/* <span className='grm'>
          GRM
        </span>
        <span className='dashboard'>
          DASHBOARD 
        </span> */}
      </div>
      <div className='header-time-cell'>
        <rux-clock />
      </div>
      <div className='header-widget-cell'>
        
        <RuxMonitoringIcon 
        icon='mission' 
        sublabel="Sub-label" 
        status="off" 
        notifications="4"
        />
        <RuxMonitoringIcon 
        icon='antenna' 
        sublabel="RF" 
        status="caution" 
        notifications="4"
        />
        <RuxMonitoringIcon 
        icon='equipment' 
        sublabel="Sub-label" 
        status="standby" 
        notifications="4"
        />
          <div className='antenna-cell'>
            <div className='line-break'></div>
            <RuxMonitoringIcon 
              icon='antenna-transmit' 
              label='SBSS=1' 
              status="standby" 
              notifications="4"
          />
              <RuxMonitoringIcon 
                container=''
                className='icon'
                icon='antenna-receive' 
                label='SBSS=1' 
                status="standby" 
                notifications="4"
              />
        </div>
      </div>
    </div>
  )
}

export default Header