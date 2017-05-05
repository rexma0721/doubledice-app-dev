// Utils
import styled from 'styled-components'
import { ConfirmButton, Input, SecondaryButton } from 'components/createBetPage/Main/StyledComponents'
import { brightGray, supernova } from 'styles/colors'

export const Wrapper = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;


  @media only screen and (max-height: 500px) {
    align-items: flex-start;
  }
`

export const SubWrapper = styled.div`
  position: relative;
  color: white;
  width: 40rem;
  text-align: center;

  @media only screen and (max-height: 500px) {
    margin: 5rem 0;
  }
`

export const LinksWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 2.5rem;
`

export const Emoji = styled.h1`
  font-size: 5rem;;
`

export const Title = styled.h1`
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 2.2rem;
  text-transform: uppercase;
  line-height: 40px;
  letter-spacing: 0.15rem;
`

export const Description = styled.h6`
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 4rem;
`

export const ShareTitle = styled.h6`
  font-weight: 600;
  font-size: 1.2rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
`

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const ReadOnlyInput = styled(Input)`
  border-radius: 0.5rem 0 0 0.5rem;
  width: calc(100% - 5rem);
  padding-right: 0;
`

export const CopyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;  
  background-color: ${brightGray};
  border-radius: 0 0.5rem 0.5rem 0;
  width: 5rem;
  height: 5rem;
`

export const IconsContainer = styled.div`
  display: flex;
  margin: 1rem 0;

`

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 1rem;
`

export const LinkRoomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  width: 35rem;
  background-color: ${supernova};
  border: none;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  text-transform: uppercase;
  font-weight: 600;
  margin: 3.3rem 0 1.5rem;
  color: black;
`

export const LinkMainWrapper = styled(LinkRoomWrapper)`
  background-color: transparent;
  border: 1px solid ${supernova};
  color: ${supernova};
  margin: 0;
`