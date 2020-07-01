import styled from 'styled-components';

export const Image = styled.img`
  margin-left: 40px;
  height: 100%;
  width: 99px;
  background: ${props => `url(${props.image}) no-repeat center`};
  background-size: cover;
`;
