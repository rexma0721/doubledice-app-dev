// Utils
import styled from 'styled-components'
import { boulder, confirmGreen, supernova } from 'styles/colors'

interface CheckBoxI {
  checked: boolean
  color: string | undefined
}

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export const StyledCheckbox = styled.div<CheckBoxI>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${({ checked, color }) => (
    (checked && color === 'red') ? 'salmon' :
      (checked && color === 'green') ? confirmGreen :
        (checked && color === 'yellow') ? supernova : boulder
  )};
  border: none;
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: ${({ checked, color }) => (
    (checked && color === 'red') ? '0 0 0 3px pink' :
      (checked && color === 'green') ? '0 0 0 3px green' :
        (checked && color === 'yellow') ? '0 0 0 3px gold' : '0 0 0 3px pink'
  )};
  }

  ${Icon} {
    visibility: ${({ checked }) => checked ? 'visible' : 'hidden'}
  }
`

export const Wrapper = styled.div`
  margin: 2rem 0;
  width: fit-content;
`

export const SubWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`

export const Label = styled.label`
  display: flex;
  cursor: pointer;
`

export const Span = styled.span`
  color: white;
  font-size: 1.2rem;
  font-family: 'Poppins';
`

export const Title = styled.h3`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.4rem;
`