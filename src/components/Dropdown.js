import { RuxSelect, RuxOption } from "@astrouxds/react";


const Dropdown = ({ value }) => {
    console.log(value)

    return (
        <>  <RuxSelect>
                <RuxOption value="All" label="All"></RuxOption>
                <RuxOption value="critical" label="Critical"></RuxOption>
                <RuxOption value="serious" label="Serious"></RuxOption>
                <RuxOption value="caution" label="Caution"></RuxOption>
            </RuxSelect>
          
        </>
    )
}

export default Dropdown; 