import { useRef, useState } from "react";

// Utils
import { BiFilterAlt } from 'react-icons/bi'
// import { categories } from 'utils/categories';

// Components
import * as S from './StyledComponents';
import Collapsible from './Collapsible'

// Hooks
import useOutsideAlerter from "hooks/clickedOutside";

const Filter = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const buttonRef = useRef(null);
  useOutsideAlerter(buttonRef, () => setIsModalOpen(false));

  return (
    <S.Wrapper ref={buttonRef}>
      {/* <S.Button onClick={() => setIsModalOpen(true)}>
        <BiFilterAlt color='white' size={25} />
        <S.Title>Filters</S.Title>
      </S.Button>
      {isModalOpen && (
        <S.Modal>
          <Collapsible
            title='Categories'
            options={Object.values(categories).map((category) => category)}
          />
        </S.Modal>
      )} */}
    </S.Wrapper>
  );
};

export default Filter;
