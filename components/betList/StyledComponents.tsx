// Utils
import styled from 'styled-components'
import { supernova } from 'styles/colors';

interface SortButtonI {
  orderDirection: string
}

interface PaginationWrapperI {
  justifyContent: string
}

export const Container = styled.table`
  width: 100%;
  color: white;
  padding: 2rem 3rem;
`;

export const Header = styled.header`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
  gap: 1rem;
  align-items: center;
  width: 100%;
  padding: 1rem 3rem;
  margin: 2rem 0;
`;

export const TitleWrapper = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
`;

export const Title = styled.h2`
  text-align: left;
  font-size: 2rem;
  text-transform: uppercase;
`;

export const SortButton = styled.button<SortButtonI>`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  transform: ${props => props.orderDirection==='asc' ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

export const BetsWrapper = styled.div`
  height: 110rem;
  display: flex;
  justify-content: center;
`;

export const PaginationWrapper = styled.div<PaginationWrapperI>`
  width: 100%;
  margin: 4rem 0;
  display: flex;
  justify-content: ${props => props.justifyContent};
  align-items: center;
`;

export const LinkWrapper = styled.div`
  cursor: pointer;
`;

export const ATag = styled.a`
  font-size: 1.4rem;
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 2rem;
`;

export const Span = styled.span`
  font-size: 2.4rem;
  color: ${supernova};
  transform: translateY(-0.2rem);
  margin: 0 0.5rem;
`;