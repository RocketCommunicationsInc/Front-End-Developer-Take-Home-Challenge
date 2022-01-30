import { RuxSelect, RuxOption } from "@astrouxds/react";


const Dropdown = ({ value }) => {
    console.log(value)

    return (
        <>  
            <RuxSelect label="Select Menu" input-id="1" label-id="1">
                <RuxOption value="" selected="" label="Select an option"></RuxOption>
                <RuxOption value="1.1" label="Option 1.1"></RuxOption>
                <RuxOption value="1.2" label="Option 1.2"></RuxOption>
                <RuxOption value="1.3" label="Option 1.3"></RuxOption>
                <RuxOption value="1.4" label="Option 1.4"></RuxOption>
            </RuxSelect></>
    )
}

export default Dropdown; 