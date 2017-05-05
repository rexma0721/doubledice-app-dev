// Components
import * as S from './StyledComponents'

interface PropsI {
  className?: string
  name: string
  [key: string]: any
  onChange: (e: { target: HTMLInputElement }) => void
  value: boolean
  color: string | undefined
}

const Checkbox = ({ className, name, onChange, value, color }: PropsI) => {

  return (
    <S.SubWrapper className={className}>
      <S.HiddenCheckbox
        checked={value}
        name={name}
        onChange={onChange}
      />
      <S.StyledCheckbox
        checked={value}
        color={color}
      >
        <S.Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </S.Icon>
      </S.StyledCheckbox>
    </S.SubWrapper>
  );
};

export default Checkbox;
