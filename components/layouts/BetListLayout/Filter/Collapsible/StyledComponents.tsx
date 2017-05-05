// Utils
import styled from 'styled-components'
import { semiGray } from 'styles/colors';


interface MainI {
  isOpen: boolean
  height?: number
}

interface IconWrapperI {
  isOpen: boolean
}

export const Wrapper = styled.div`

`;

export const Header = styled.button`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const IconWrapper = styled.div<IconWrapperI>`
  transition: all 0.2s;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  display: flex;
  align-items: center;
`;

export const Title = styled.p`
  color: white;
  font-size: 1.6rem;
`;

export const Main = styled.div<MainI>`
  transition: all 0.2s ease-out;
  height: ${props => (props.isOpen && props.height) ? `${props.height / 10 + 4}rem` : '0'};
  padding: ${props => props.isOpen ? '2rem' : '0 2rem'};
  overflow: hidden;
  background-color: ${semiGray};
`;

export const Label = styled.label`
  display: flex;
  cursor: pointer;
`

export const Span = styled.span`
  color: white;
  font-size: 1.2rem;
  font-family: 'Poppins';
`

export const CheckBoxWrapper = styled.div`
  padding: 1rem 0;
`