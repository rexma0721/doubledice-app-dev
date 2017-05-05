import { useState } from "react";

// Utils
import { FaChevronDown } from 'react-icons/fa'

// Components
import * as S from './StyledComponents';
import Checkbox from 'components/shared/CheckBox/CheckBox'


interface PropsI {
  title: string
  options: any
}

interface CheckboxValueI {
  [key: string]: boolean;
}

const Filter = ({ title, options }: PropsI) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [checkBoxValues, setCheckBoxValues] = useState<CheckboxValueI>({
    "1": false,
  });

  const handleToggle = (e: { target: HTMLInputElement }) => {
    setCheckBoxValues((prevState) => ({
      ...prevState,
      [e.target.name]: !prevState[e.target.name],
    }));
  }

  // makeSticky =
  // +window.scrollY > +navRef.current.getBoundingClientRect().height;
  return (
    <S.Wrapper>
      {/* <S.Header onClick={() => setIsOpen(prevState => !prevState)}>
        <S.Title>{title}</S.Title>
        <S.IconWrapper isOpen={isOpen}>
          <FaChevronDown color='white' size={15} />
        </S.IconWrapper>
      </S.Header>
      <S.Main isOpen={isOpen}>
        {
          options.map(option => (
            <S.CheckBoxWrapper>
              <S.Label>
                <Checkbox
                  key={option.title}
                  onChange={handleToggle}
                  value={Boolean(checkBoxValues[option.title])}
                  name={option.title}
                  title={option.title}
                  color='yellow'
                />
                <S.Span>{option.title}</S.Span>
              </S.Label>
              {
                option.subcategory.map(sc => (
                  <S.CheckBoxWrapper>
                    <S.Label>
                      <Checkbox
                        key={sc}
                        onChange={handleToggle}
                        value={Boolean(checkBoxValues[sc])}
                        name={sc}
                        title={sc}
                        color='yellow'
                      />
                      <S.Span>{sc}</S.Span>
                    </S.Label>
                  </S.CheckBoxWrapper>
                ))
              }
            </S.CheckBoxWrapper>
          ))
        }
      </S.Main> */}
    </S.Wrapper>
  );
};

export default Filter;
