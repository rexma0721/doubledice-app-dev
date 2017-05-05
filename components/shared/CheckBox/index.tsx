// Components
import * as S from './StyledComponents'
import CheckBox from './CheckBox'

interface PropsI {
  className?: string
  name: string
  [key: string]: any
  text: string | React.ReactNode
  onChange: (e: { target: HTMLInputElement }) => void
  value: boolean
  color?: string
}

const Checkbox = ({ className, name, text, onChange, value, color }: PropsI) => {

  return (
    <S.Wrapper>
      <S.Label>
        <CheckBox
          className={className}
          value={value}
          name={name}
          color={color}
          onChange={onChange}
        />
        <S.Span>{text}</S.Span>
      </S.Label>
    </S.Wrapper>
  );
};

export default Checkbox;
