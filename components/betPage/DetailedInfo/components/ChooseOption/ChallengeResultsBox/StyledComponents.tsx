// Utils
import styled from 'styled-components'
import { Title as BoxTitle } from '../shared/StyledComponents'


export const Header = styled.header`
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 1.7rem;
  color: white;
  margin-bottom: 2rem;
`

export const Title = styled(BoxTitle)`
  position: relative;
  margin-right: 0;
`

export const Text = styled.p`
  color: white;
  font-size: 1.2rem;
  margin-top: 1rem;
  margin-left: 1rem;
`

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const TextWrapper = styled.div`
  position: relative;
  margin: 4rem 0 1rem;
`

export const WarningSign = styled.p`
  color: #db3131;
  filter: brightness(1.2);
  position: absolute;
  left: 0;
  top: -0.2rem;
`

export const InfoIconWrapper = styled.div`
  position: absolute;
  right: -3rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
`