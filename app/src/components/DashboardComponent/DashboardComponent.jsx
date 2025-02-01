import React, { FC, useState } from 'react';
import { DashboardComponentWrapper } from './DashboardComponent.styled';
import { DashboardComponentProps } from '../../shared/models';

const DashboardComponent: FC<DashboardComponentProps> = () => (
 <DashboardComponentWrapper data-testid="DashboardComponent">
    DashboardComponent Component
 </DashboardComponentWrapper>
);

export default DashboardComponent;
