import { useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";

// Utils
import { HiFlag } from "react-icons/hi";
import { osloGray } from "styles/colors";
import { toast } from "react-toastify";
import Honeybadger from '@honeybadger-io/js'
import { SpinnerDotted } from "spinners-react"

// Components
import * as S from "./StyledComponents";
import Checkbox from 'components/shared/CheckBox'

// Hooks
import useOutsideAlerter from "hooks/clickedOutside";
import { VirtualFloor } from "lib/graph";
import fetch from "isomorphic-unfetch";


interface CheckboxValueI {
  [key: string]: boolean;
}

interface PropsI {
  virtualFloor: VirtualFloor;
}

interface Reasons {
  [key: string]: string;
}

const ReportButton = ({ virtualFloor }: PropsI) => {
  const { account } = useWeb3React();

  const [checkBoxValues, setCheckBoxValues] = useState<CheckboxValueI>({ "1": false, });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOthersInputOpen, setIsOthersInputOpen] = useState<boolean>(false);
  const [othersInput, setOthersInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userReport, setUserReport] = useState<Reasons | null>(null);
  const buttonRef = useRef(null);
  useOutsideAlerter(buttonRef, () => setIsModalOpen(false));

  const reports = ["Bet is confusing", "Bet is unethical", "Challenge set result/outcome"];

  const handleToggleOthersInput = (e: { target: HTMLInputElement }) => {
    setCheckBoxValues((prevState) => ({
      ...prevState,
      [e.target.name]: !prevState[e.target.name],
    }));

    setIsOthersInputOpen((prev) => !prev)
  }

  const handleToggle = (e: { target: HTMLInputElement }) => {
    setCheckBoxValues((prevState) => ({
      ...prevState,
      [e.target.name]: !prevState[e.target.name],
    }));

    if (e.target.checked) {
      setUserReport((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } else {
      userReport && delete userReport[e.target.name];
    }
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      let reasons = [];

      if (userReport) {
        reasons.push(...Object.values(userReport));
      }
      if (othersInput) {
        reasons.push(othersInput.trim());
      }
      const walletAddress = account ? account : "Not Provided"
      const postData = {
        virtualFloorId: virtualFloor.id,
        virtualFloorTitle: virtualFloor.title,
        reasons: reasons.toString(),
        account: walletAddress,
      };
      const headers = {
        "Content-Type": "application/json",
        withCredentials: false,
      };

      const request = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/api/flag/`, postData);
      if (request.data.status === "success") {
        toast.success("Report submitted to the Admin");
        setIsLoading(false)
        setCheckBoxValues({ "1": false, })
        setIsModalOpen(false)
        return;
      }
      if (request.data.status === "failed") {
        toast.error(request.data.message);
        setIsLoading(false)
        return;
      }


    } catch (error: any) {
      setIsLoading(false)
      if (error instanceof Error) {
        toast.error(error?.message);
        Honeybadger.notify(`Flagging request to Google Sheet failed with: ${error}`);
      }
    }
  };


  return (
    <S.Container>
      <S.SubContainer ref={buttonRef}>
        <S.IconButton onClick={() => setIsModalOpen(true)}>
          <HiFlag size={20} color={osloGray} />
        </S.IconButton>
        {isModalOpen && (
          <S.Modal>
            <S.Title>What is the issue?</S.Title>
            <form onSubmit={handleSubmit}>
              {reports.map((report, index) => (
                <Checkbox
                  onChange={handleToggle}
                  value={Boolean(checkBoxValues[String(index)])}
                  name={String(index)}
                  text={report}
                  color='red'
                />
              ))}
              <Checkbox
                onChange={handleToggleOthersInput}
                value={Boolean(checkBoxValues[String(reports.length)])}
                name={String(reports.length)}
                text='Others'
                color='red'
              />
              {isOthersInputOpen && <S.TextArea value={othersInput} onChange={(e) => setOthersInput(e.target.value)}></S.TextArea>}
              <S.ConfirmButton type="submit">
                {isLoading ?
                  <SpinnerDotted
                    size={20}
                    color="white"
                    thickness={200}
                    enabled={isLoading}
                  />
                  :
                  'Report'
                }</S.ConfirmButton>
            </form>
          </S.Modal>
        )}
      </S.SubContainer>
    </S.Container>
  );
};

export default ReportButton;
