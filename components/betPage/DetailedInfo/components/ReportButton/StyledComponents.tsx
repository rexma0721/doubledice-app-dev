// Utils
import styled from 'styled-components'
import { boulder, charade, ebonyClay, mirage, monza } from 'styles/colors'
import { ModalContainer } from 'styles/GlobalStyledComponents'

interface CheckBoxI {
  checked: boolean
}

export const Container = styled.div`
  position: relative;
  margin-top: 2rem;
  padding: 0 2rem;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const SubContainer = styled.div`
  position: relative;
  width: fit-content;
`

export const Modal = styled(ModalContainer)`
  position: absolute;
  right: 0;
  bottom: 3rem;
  width: 30rem;
  z-index: 100;
  padding: 2rem;
  background-color: ${charade};
  border: 1px ${mirage} solid;
`

export const ConfirmButton = styled.button`
  border-radius: 0.5rem;
  color: white;
  height: 4rem;
  width: 100%;
  background-color: ${monza};
  margin-top: 1rem;
`

export const Title = styled.h3`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.4rem;
`

export const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 10rem;
  border-radius: 0.5rem;
  outline: none;
  padding: 1rem;
  font-family: 'Poppins';
`

export const IconButton = styled.button`
  display: flex;
  align-items: center;
`