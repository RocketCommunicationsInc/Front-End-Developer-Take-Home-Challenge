import styled from 'styled-components';

export const StyledModalComponentWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);  /* Semi-transparent background */
  z-index: 1000; /* Setting the z-index to make sure it appears on top */
`;

export const StyledModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  color: black;
  padding: 1rem 1rem 2rem 2rem;
  border-radius: 10px;
  text-align: left;
`;

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between; 
  alignItems: center;
`;

export const StyledModalButtonWrapper = styled.div`
  margin: 1rem 2rem 0 0;
  float: right;
`;

export const StyledModalButtonContainer = styled.div`
  display: inline-flex;
  gap: 20px;
`;
