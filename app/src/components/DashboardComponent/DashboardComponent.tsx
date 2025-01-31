import React, { FC } from 'react';
import { DashboardComponentWrapper } from './DashboardComponent.styled';

interface DashboardComponentProps {}

const DashboardComponent: FC<DashboardComponentProps> = () => (
 <DashboardComponentWrapper data-testid="DashboardComponent">
    DashboardComponent Component
 </DashboardComponentWrapper>
);

export default DashboardComponent;
