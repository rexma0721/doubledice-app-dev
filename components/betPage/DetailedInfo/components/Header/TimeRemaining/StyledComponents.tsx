// Utils
import styled from 'styled-components'
import { doveGray } from 'styles/colors'

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  width: 20rem;
`

export const Wrapper = styled.div`

`

export const TimeContainer = styled.div`
  width: 3rem;
`

export const Time = styled.p`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
`

export const Text = styled.p`
  margin: 0;
  margin-left: 0.5rem;
  font-size: 1.5rem;
`

export const Title = styled.p`
  font-size: 1.2rem;
  color:${doveGray};
  text-transform: uppercase;
  width: fit-content;
  margin: 0 auto;
`

export const SVGContainer = styled.div`
  height: 2.5rem;
  display: flex;
  align-items: center;
`

export const Header = styled.div`
  font-size: 2rem;
  color: white;
  margin-bottom: 0.5rem;
`

export const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: ${doveGray};
`