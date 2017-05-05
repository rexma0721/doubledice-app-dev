// Components
import { setCategoryId } from "components/createBetPage/ducks";

// Redux
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { CATEGORIES } from 'utils/categories';
import CategoryBox from './CategoryBox';
import * as S from "./StyledComponents";

interface PropsI {
  nextStep: () => void
}

const ChooseCategory = ({ nextStep }: PropsI) => {
  const { categoryId } = useAppSelector((state) => state.createBetReducer)
  const dispatch = useAppDispatch()

  const onCategorySelected = (chosenCategoryId: string) => {
    if (chosenCategoryId !== categoryId) {
      dispatch(setCategoryId(chosenCategoryId))
    }
    nextStep()
  }

  return (
    <S.Container>
      <CategoryBox
        onCategorySelected={onCategorySelected}
        category={CATEGORIES.sports}
        featuredSubcategorySubids={['american-football', 'basketball', 'combat', 'soccer', 'tennis', 'cricket', 'other']}
      />
      <CategoryBox
        onCategorySelected={onCategorySelected}
        category={CATEGORIES.esports}
      />
      <CategoryBox
        onCategorySelected={onCategorySelected}
        category={CATEGORIES.politics}
      />
      <CategoryBox
        onCategorySelected={onCategorySelected}
        category={CATEGORIES.entertainment}
        translateY={-3}
      />
      <CategoryBox
        onCategorySelected={onCategorySelected}
        category={CATEGORIES.crypto}
        translateY={-3}
      />
      <CategoryBox
        onCategorySelected={onCategorySelected}
        category={CATEGORIES.other}
        translateY={-3}
      />
    </S.Container>
  );
};

export default ChooseCategory;
