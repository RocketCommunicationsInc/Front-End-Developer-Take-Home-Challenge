import React from 'react';
import { RuxSelect, RuxOption } from '@astrouxds/react';


const SeveritySelect = ({ select, handleSelect }) => {
  return (
    <RuxSelect
      input-id='1'
      label-id='1'
      label='Severity Search'
      onRuxchange={handleSelect}
      name='default'
      size='small'
      className='w-1/5 mb-2 items-center justify-center'>
      <RuxOption label='Severity'></RuxOption>
      <RuxOption value={'serious'} label='Serious'></RuxOption>
      <RuxOption value={'critical'} label='Critical'></RuxOption>
      <RuxOption value={'caution'} label='Caution'></RuxOption>
      <RuxOption value={'recent'} label='Recent'></RuxOption>
    </RuxSelect>
  );
};

export default SeveritySelect;
