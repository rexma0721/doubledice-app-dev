import { HTMLAttributes, useState } from "react";

// Utils
import * as S from "./StyledComponents";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { boulder } from "styles/colors";
import { usePopper } from "react-popper";

interface PropsI {
  description: string
  color?: string
}

const InfoModal = ({ description, color }: PropsI) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [10, 2],
        },
      },
    ],
  });

  return (
    <S.IconContainer
      onMouseOver={() => setIsModalOpen(true)}
      onMouseLeave={() => setIsModalOpen(false)}
      ref={setReferenceElement}
    >
      <AiOutlineInfoCircle size={20} color={color || boulder} />
      {isModalOpen && (
        <S.Modal
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <S.ModalText>{description}</S.ModalText>
        </S.Modal>
      )}
    </S.IconContainer>
  );
};

export default InfoModal;
