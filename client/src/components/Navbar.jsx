import React from 'react'
import { RuxGlobalStatusBar,RuxClock,RuxButton,RuxIcon} from '@astrouxds/react'
const Navbar = () => {
  return (

 <div className='flex justify-center'>
     <RuxGlobalStatusBar app-name={'Freindship 7'} username={"John Glenn"} include-icon={true} app-domain={"East"} >
     <RuxClock/>
        <RuxIcon size={'small'} icon={"search"}/>
     {/* <RuxButton size={"small"}>Emergency Shut Off</RuxButton> */}
     </RuxGlobalStatusBar>
</div> 
  )
}

export default Navbar