import { useState, useLayoutEffect } from "react"

// Redux
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { setFormData } from "components/createBetPage/ducks";

// Utils
import { toast } from "react-toastify"
import moment from 'moment-timezone'

// Components
import DateOfBets from "./components/DateOfBets"
import SizeOfBets from "./components/SizeOfBets"
import Multiplier from "./components/Multiplier"
import * as S from "./StyledComponents"
import * as SC from 'components/createBetPage/Main/StyledComponents'
import assert from "assert";

interface PropsI {
  nextStep: () => void;
}

const BetDetails = ({ nextStep }: PropsI) => {
  const [tOpen, setTOpen] = useState<number>(0)
  const [tClose, setTClose] = useState<number>(0)
  const [tResolve, setTResolve] = useState<number>(0)
  const [minimumBet, setMinimumBet] = useState<string>("")
  const [maximumBet, setMaximumBet] = useState<string>("")
  const [rake, setRake] = useState<string>("")
  const [multiplier, setMultiplier] = useState<string>("")

  const createBetForm = useAppSelector((state) => state.createBetReducer)
  const dispatch = useAppDispatch()

  const toggleNextStep = () => {
    const currentTimestamp = Math.floor(moment().unix());

    if (tOpen === 0) {
      toast.error("Bet start time is required");
      return;
    }

    if (tClose === 0) {
      toast.error("Bet close time is required");
      return;
    }

    if (tResolve === 0) {
      toast.error("Result time is required");
      return;
    }

    // Here we mirror the check done in VirtualFloorCreationParamsUtils.sol,
    // to avoid an on-chain InvalidTimeline error.
    if (!(tOpen < tClose)) {
      toast.error("Bet start time must be before bet close time");
      return;
    }

    // Here we mirror the check done in VirtualFloorCreationParamsUtils.sol,
    // to avoid an on-chain TooLate error.
    assert(tOpen < tClose);
    const tCreateMax = tOpen + Math.floor((tClose - tOpen) / 10);
    if (!(currentTimestamp <= tCreateMax)) {
      toast.error("Bet start time should be set to a future point in time");
      return;
    }

    // Here we mirror the check done in VirtualFloorCreationParamsUtils.sol,
    // to avoid an on-chain InvalidTimeline error.
    const _MAX_POSSIBLE_BLOCK_TIMESTAMP_DISCREPANCY = 60;
    const _MIN_POSSIBLE_T_RESOLVE_MINUS_T_CLOSE = 10 * _MAX_POSSIBLE_BLOCK_TIMESTAMP_DISCREPANCY;
    if (!(tClose + _MIN_POSSIBLE_T_RESOLVE_MINUS_T_CLOSE <= tResolve)) {
      toast.error("Bet close time must be at least 10 minutes before result time");
      return;
    }

    if (minimumBet && Number(minimumBet) < 0) {
      toast.error("Minimum bet amount cannot be negative");
      return;
    }

    if (maximumBet && Number(maximumBet) < 0) {
      toast.error("Maximum bet amount cannot be negative");
      return;
    }

    if (Number(minimumBet) !== 0 && Number(maximumBet) !== 0) {
      if (Number(minimumBet) > Number(maximumBet)) {
        toast.error("Minimum bet amount cannot be more than maximum bet");
        return;
      }
    }

    if (Number(rake) < 1 || Number(rake) > 20) {
      toast.error("Rake must be between 1 and 20");
      return;
    }

    if (Number(multiplier) < 2 || Number(multiplier) > 99) {
      toast.error("Multiplier must be between 2 and 99");
      return;
    }


    dispatch(
      setFormData({
        tOpen,
        tClose,
        tResolve,
        minimumBet,
        maximumBet,
        rake,
        multiplier,
      })
    );
    nextStep()
  };

  useLayoutEffect(() => {
    if (createBetForm) {

      // Beware: Do not .add() directly onto currentMoment, but first .clone(),
      // as .add() mutates currentMoment object.
      // See https://momentjscom.readthedocs.io/en/latest/moment/01-parsing/12-moment-clone/
      const currentMoment = moment();

      if (createBetForm.tOpen) {
        setTOpen(createBetForm.tOpen);
      } else {
        // See https://doubledice.slack.com/archives/C03903Y2FPX/p1650277383250649?thread_ts=1650277337.842219&cid=C03903Y2FPX
        setTOpen(currentMoment.clone().add(6, 'hours').unix());
      }
      if (createBetForm.tClose) {
        setTClose(createBetForm.tClose);
      } else {
        // See https://doubledice.slack.com/archives/C03903Y2FPX/p1650277383250649?thread_ts=1650277337.842219&cid=C03903Y2FPX
        setTClose(currentMoment.clone().add(9, 'hours').unix());
      }
      if (createBetForm.tResolve) {
        setTResolve(createBetForm.tResolve);
      } else {
        // See https://doubledice.slack.com/archives/C03903Y2FPX/p1650277383250649?thread_ts=1650277337.842219&cid=C03903Y2FPX
        setTResolve(currentMoment.clone().add(12, 'hours').unix());
      }
      if (createBetForm.minimumBet) setMinimumBet(createBetForm.minimumBet)
      if (createBetForm.maximumBet) setMaximumBet(createBetForm.maximumBet)
      if (createBetForm.rake) setRake(createBetForm.rake)
      if (createBetForm.multiplier) setMultiplier(createBetForm.multiplier)
    } else {
      console.warn(`createBetForm is ${createBetForm}`)
    }
  }, [createBetForm])

  return (
    <S.Container>
      <DateOfBets
        setTOpen={setTOpen}
        setTClose={setTClose}
        setTResolve={setTResolve}
        tOpen={tOpen}
        tClose={tClose}
        tResolve={tResolve}
      />
      <SizeOfBets
        setMinimumBet={setMinimumBet}
        setMaximumBet={setMaximumBet}
        setRake={setRake}
        minimumBet={minimumBet}
        maximumBet={maximumBet}
        rake={rake}
      />
      <Multiplier setMultiplier={setMultiplier} multiplier={multiplier} />
      <SC.ConfirmButton onClick={toggleNextStep}>Next Step</SC.ConfirmButton>
    </S.Container>
  );
};

export default BetDetails;
