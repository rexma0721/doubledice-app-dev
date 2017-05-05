import { setFormData } from "components/createBetPage/ducks";

// Redux
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import { CATEGORIES, CategoryId, SubcategoryData } from "utils/categories";
import { isTestModeActivated } from "utils/helpers";

// Components
import SelectButton from '../../../shared/SelectButton';
import * as SC from "../StyledComponents";

// Utils
import * as S from "./StyledComponents";




interface PropsI {
  nextStep: () => void;
}

const EventInformation = ({ nextStep }: PropsI) => {
  const [subcategorySubid, setSubcategorySubid] = useState<string>("");
  const [subcategories, setSubcategories] = useState<SubcategoryData[]>([]);
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const dispatch = useAppDispatch()

  const {
    categoryId: appCategoryId,
    subcategorySubid: appSubcategorySubid,
    title,
    description
  } = useAppSelector((state) => state.createBetReducer);

  const toggleNextStep = () => {
    if (subcategorySubid == "") {
      toast.error("Please select the sub-category");
      return;
    }
    if (eventTitle.trim() == "") {
      toast.error("Please enter the events Title");
      return;
    }
    if (eventTitle.trim().length > 32) {
      toast.error("Event titles must be less than 32 characters");
      return;
    }
    if (eventDescription.trim() == "") {
      toast.error("Please enter the events description");
      return;
    }
    if (eventDescription.trim().length > 256) {
      toast.error("Event description must be less than 256 characters");
      return;
    }

    dispatch(
      setFormData({
        subcategorySubid,
        title: eventTitle.trim(),
        description: eventDescription.trim(),
      }))
    nextStep()
  };

  useLayoutEffect(() => {
    if (appCategoryId) handleCategory(appCategoryId);
  }, [appCategoryId, appSubcategorySubid])

  useLayoutEffect(() => {
    if (title) setEventTitle(title)
  }, [title])

  useLayoutEffect(() => {
    if (description) setEventDescription(description)
  }, [description])

  const isTestMode = isTestModeActivated(useRouter().query);

  const handleCategory = (theCategoryId: string) => {
    if (theCategoryId in CATEGORIES) {
      const { subcategories } = CATEGORIES[theCategoryId as CategoryId];

      // In test-mode, include 'test' subcategory if it exists
      const filteredSubcategories = isTestMode ? subcategories : subcategories.filter(({ subid }) => subid !== 'test');

      const subcategorySubids = filteredSubcategories.map(({ subid }) => subid);
      setSubcategories(filteredSubcategories);
      if (subcategorySubids.includes(appSubcategorySubid)) {
        setSubcategorySubid(appSubcategorySubid);
      } else if (subcategorySubids.length === 1) {
        setSubcategorySubid(subcategorySubids[0]);
      } else if (subcategorySubids.includes('test') && isTestMode) {
        setSubcategorySubid('test');
      } else {
        dispatch(
          setFormData({
            subcategorySubid: '',
          }))
        setSubcategorySubid('')
      }
    } else {
      // We shouldn't end up here
    }
  };

  return (
    <S.Wrapper>
      {subcategories.length > 1 ?
        <SC.InputContainer>
          <SC.Title>
            Subcategory<SC.Required>*</SC.Required>
          </SC.Title>
          {/* ToDo: title<=>subid conversion hack necessary because there isn't a component like SelectButton
            but which supports the option text being different from the values. */}
          <SelectButton
            options={subcategories.map(({ title }) => title)}
            setOption={(selectedTitle: string) => setSubcategorySubid(subcategories.find(({ title }) => title === selectedTitle)?.subid || '')}
            selectedOption={subcategories.find(({ subid }) => subid === subcategorySubid)?.title || ''}
          />
        </SC.InputContainer>
        : ''
      }
      <SC.InputContainer>
        <SC.Title>
          Event Title<SC.Required>*</SC.Required>
        </SC.Title>
        <SC.Input
          placeholder="Event Title..."
          onChange={(e) => setEventTitle(e.target.value)}
          value={eventTitle}
          maxLength={30}
        />
      </SC.InputContainer>
      <SC.InputContainer>
        <SC.Title>
          Event Description<SC.Required>*</SC.Required>
        </SC.Title>
        <SC.Textarea
          placeholder="Describe in detail the essence of the event"
          onChange={(e) => setEventDescription(e.target.value)}
          value={eventDescription}
          maxLength={150}
        />
      </SC.InputContainer>
      <SC.ConfirmButton onClick={toggleNextStep}>Next Step</SC.ConfirmButton>
    </S.Wrapper>
  );
};

export default EventInformation;
