import { useState, useEffect, useLayoutEffect } from "react";

// Next
import { useRouter } from "next/router";

// Redux
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { setFormData, removeFormData, setQuotaInfo } from "components/createBetPage/ducks";

// Utils
import axios from "axios";
import * as S from "./StyledComponents";
import * as SC from "components/createBetPage/Main/StyledComponents";
import { toast } from "react-toastify";
import {
  encodeVirtualFloorMetadata,
  RoomEventInfo,
  VirtualFloorCreationParamsStruct,
} from "lib/contracts";
import { BigNumber as BigInteger, ethers } from "ethers";
import { validateRoomEventInfo } from "lib/metadata";
import { createVirtualFloor } from "web3Api/platformContract";
import { useWeb3React } from "@web3-react/core";
import { SpinnerDotted } from "spinners-react";
import {
  getUserBalance,
  increaseAllowanceIfNecessary,
} from "web3Api/tokenContract";
import { ImageContainers } from "utils/types";
import Honeybadger from "@honeybadger-io/js";

// Components
import SelectButton from "components/shared/SelectButton";
import {
  convertNumToBigInt,
  DISCORD_CHANNEL_ID_NONE,
  getNetwork,
  hexToNumber,
  isValidURL,
  maxInt,
  showError,
  slugifyUrl,
  ZERO,
} from "utils/helpers";
import persistData from "utils/persistData"
import SourceInput from "./SourceInput";
import networkConfig from "config/networkConfig";
import TermsAndConditions from 'components/shared/TermsAndConditions'
import Checkbox from "components/shared/CheckBox";


export interface SourcesI {
  title: string;
  url: string;
}

const Other = () => {
  const router = useRouter();
  const { account, library } = useWeb3React();
  const [visibility, setVisibility] = useState<string | number>("Public (Open to all, shown in lobby)");
  const [isTermsCheckboxClicked, setIsTermsCheckboxClicked] = useState<boolean>(false);
  const [isDiscordCheckboxClicked, setIsDiscordCheckboxClicked] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sources, setSources] = useState<RoomEventInfo["resultSources"]>([{ title: "", url: "" }]);

  const createBetForm = useAppSelector(state => state.createBetReducer);
  const dispatch = useAppDispatch();

  function handleRemoveSource(i: number) {
    const newSources = [...sources];
    newSources.splice(i, 1);
    setSources(newSources);
  }

  function handleSourceTitleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) {
    let newSources = JSON.parse(JSON.stringify(sources));
    newSources[i].title = e.target.value;
    setSources(newSources);
  }

  function handleSourceLinkChange(
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) {
    let newSources = JSON.parse(JSON.stringify(sources));
    newSources[i].url = e.target.value.trim();
    setSources(newSources);
  }

  const createDiscordChannel = async (channelName: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/discord/`,
        {
          channelName,
        }
      );
      return res.data.data.id;
    } catch (error: any) {
      toast.error("Problem creating discord Channel");
      Honeybadger.notify(`Creating discord channel failed with: ${error}`);
    }
  };

  const imageUpload = async (
    file: File,
    uploadOn: string = ImageContainers.Pinata
  ) => {
    let data = new FormData();
    data.append("file", file);

    switch (uploadOn) {
      case ImageContainers.Pinata:
        try {
          const headers = {
            pinata_api_key: process.env.PINATA_API_KEY as string,
            pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY as string,
          };

          const result = await axios.post(
            process.env.PINATA_URL as string,
            data,
            {
              headers,
            }
          );
          if (result.data) {
            return `${process.env.IPFS_GATEWAY}/${result.data.IpfsHash}`;
          }
        } catch (error: any) {
          toast.error("Error occurred while uploading image");
          Honeybadger.notify(error);
        }
        break;

      case ImageContainers.Infura:
        try {
          const encodedIdSecret = Buffer.from(
            process.env.INFURA_PROJECT_ID +
            ":" +
            process.env.INFURA_PROJECT_SECRET,
            "binary"
          ).toString("base64");

          const headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Basic ${encodedIdSecret}`,
          };

          const result = await axios.post(
            process.env.INFURA_URL as string,
            data,
            {
              headers,
            }
          );

          if (result.data) {
            return `${process.env.IPFS_GATEWAY}/${result.data.Hash}`;
          }
        } catch (error: any) {
          toast.error("Error occurred while uploading image");
          Honeybadger.notify(error);
        }
        break;

      case ImageContainers.Cloudinary:
        try {
          const { data: response } = await axios.get("/api/cloudinary");

          if (response) {
            data.append("api_key", response.apikey);
            data.append("timestamp", response.timestamp);
            data.append("signature", response.signature);
            data.append("folder", response.folder);

            const url = `https://api.cloudinary.com/v1_1/${response.cloudname}/auto/upload`;

            const result = await axios.post(url, data);
            if (result.data) {
              return result.data.secure_url;
            }
          }
        } catch (error: any) {
          toast.error("Error occurred while uploading image");
          if (error instanceof Error) {
            console.error(error?.message);
          }
        }
        break;

      default:
        return;
    }
  };

  const dataUrlToFile = async (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(",");
    if (arr.length < 2) return undefined;
    const mimeArr = arr[0].match(/:(.*?);/);
    if (!mimeArr || mimeArr.length < 2) return undefined;
    const mime = mimeArr[1],
      buff = Buffer.from(arr[1], "base64");
    return new File([buff], filename.replaceAll("/", "_"), { type: mime });
  };

  const uploadFiles = async () => {
    const ipfsHashArray: RoomEventInfo["opponents"] = [];

    for (let i = 0; i < createBetForm.opponents.length; i++) {
      const image = createBetForm.opponents[i].image;
      const title = createBetForm.opponents[i].title;

      if (image) {
        const file = await dataUrlToFile(image, title);
        if (file) {
          const result = await imageUpload(file, process.env.IPFS_PROVIDER);
          if (result) {
            ipfsHashArray.push({ title, image: result });
          }
        }
      }
    }
    return ipfsHashArray;
  };

  const toggleNextStep = async () => {
    if (isLoading) return;
    if (sources.length == 0) {
      toast.error("Please add at least one source");
      return;
    }

    for (let i = 0; i < sources.length; i++) {
      const url = sources[i].url;
      const title = sources[i].title;

      if (title.trim() === "") {
        toast.error(`Please add a title for Source #${i + 1}`);
        return;
      }

      if (url === "") {
        toast.error(`Please add a url for Source #${i + 1}`);
        return;
      }

      if (url.indexOf("https://") < 0 && url.indexOf("http://") < 0) {
        toast.error(
          `The url for Source #${i + 1} must have http:// or https:// protocol`
        );
        return;
      }

      if (!isValidURL(url)) {
        toast.error(`The url for Source #${i + 1} must be a valid URL`);
        return;
      }

      if (title.trim().length > 32) {
        toast.error("Title must be less than 32 characters");
        return;
      }
    }

    const urls = sources.map(source => source.url);
    const titles = sources.map(source => source.title);

    const isNotUniqueTitle = titles.some(
      (title, i) => titles.indexOf(title) !== i
    );

    const isNotUniqueUrl = urls.some((url, i) => urls.indexOf(url) !== i);

    if (isNotUniqueUrl) {
      toast.error("Source url must be unique");
      return;
    }

    if (isNotUniqueTitle) {
      toast.error("Source title must be unique");
      return;
    }

    if (!library || !account) {
      toast.error("Please connect your wallet to make this transaction");
      return;
    }

    if (!isTermsCheckboxClicked) {
      toast.error("Please accept our Terms and condition to create the bet");
      return;
    }

    setIsLoading(true);
    const listed =
      visibility === "Public (Open to all, shown in lobby)" ? true : false;
    dispatch(setFormData({ resultSources: sources, isListed: listed }));
    const opponents = await uploadFiles();

    let discordChannelId = DISCORD_CHANNEL_ID_NONE;
    if (isDiscordCheckboxClicked) {
      discordChannelId = await createDiscordChannel(createBetForm.title);

      if (!discordChannelId) {
        toast.error("Unable to create betting discord channel");
        setIsLoading(false);
        return;
      }
    }

    const chosenSource = sources.map(source => ({
      title: source.title.trim(),
      url: source.url.trim(),
    }));

    const metadata: RoomEventInfo = {
      title: createBetForm.title,
      description: createBetForm.description,
      category: createBetForm.categoryId,
      subcategory: createBetForm.subcategorySubid,
      opponents,
      outcomes: createBetForm.outcomes,
      resultSources: chosenSource,
      isListed: listed,
      discordChannelId,
      extraData: "0x",
    };

    if (!validateRoomEventInfo(metadata)) {
      console.error(validateRoomEventInfo.errors);
      toast.error(JSON.stringify(validateRoomEventInfo.errors));
      setIsLoading(false);
      return;
    }

    const virtualFloorId = BigInteger.from(ethers.utils.randomBytes(8)).shl(
      5 * 8
    );

    const betaOpen_e18 = BigInteger.from(10)
      .pow(12)
      .mul(Number(createBetForm.multiplier) * 1_000000);
    const creationFeeRate_e18 = BigInteger.from(10)
      .pow(14)
      .mul(Number(createBetForm.rake) * 100);

    let tOpen = Number(createBetForm.tOpen);
    let tClose = Number(createBetForm.tClose);
    let tResolve = Number(createBetForm.tResolve);
    tOpen = tOpen - (tOpen % 60);
    tClose = tClose - (tClose % 60);
    tResolve = tResolve - (tResolve % 60);
    const nOutcomes = createBetForm.outcomes.length;

    try {
      const accountSigner = library.getSigner();

      const bigIntStartingPotAmount = createBetForm.startingPot
        ? convertNumToBigInt(
          10,
          createBetForm.paymentToken.decimals,
          createBetForm.startingPot
        )
        : BigInteger.from(0);

      if (bigIntStartingPotAmount.gt(ZERO)) {
        const balance = await getUserBalance(
          accountSigner,
          createBetForm.paymentToken.address,
          account
        );
        if (balance.lt(bigIntStartingPotAmount)) {
          toast.error("You do not have enough token to set your starting pot");
          setIsLoading(false);
          return;
        }

        const checkAndApproveTx = await increaseAllowanceIfNecessary({
          signer: accountSigner,
          minAllowanceRequired: bigIntStartingPotAmount,
          tokenAddress: createBetForm.paymentToken.address,
        });

        if (checkAndApproveTx) {
          persistData(
            'Approval waiting to be mined at',
            `${getNetwork(networkConfig.networkId).explorerLink}/tx/${checkAndApproveTx.hash}`,
            checkAndApproveTx.hash
          )
          await checkAndApproveTx.wait();
        }
      }

      const optionalMinCommitmentAmount = createBetForm.minimumBet
        ? convertNumToBigInt(
          10,
          createBetForm.paymentToken.decimals,
          createBetForm.minimumBet
        )
        : BigInteger.from(0);

      const optionalMaxCommitmentAmount = createBetForm.maximumBet
        ? convertNumToBigInt(
          10,
          createBetForm.paymentToken.decimals,
          createBetForm.maximumBet
        )
        : BigInteger.from(0);

      const params: VirtualFloorCreationParamsStruct = {
        virtualFloorId,
        betaOpen_e18,
        creationFeeRate_e18,
        tOpen,
        tClose,
        tResolve,
        nOutcomes,
        paymentToken: createBetForm.paymentToken.address,
        bonusAmount: bigIntStartingPotAmount,
        optionalMinCommitmentAmount,
        optionalMaxCommitmentAmount,
        metadata: encodeVirtualFloorMetadata(metadata),
      };

      const tx = await createVirtualFloor(accountSigner, params);
      if (tx) {
        persistData(
          'Bet creation waiting to be mined at',
          `${getNetwork(networkConfig.networkId).explorerLink}/tx/${tx.hash}`,
          tx.hash
        )
        await tx.wait();

        toast.success("Congratulations! Bet creation was successful");
        router.push(`/success/#!/${hexToNumber(virtualFloorId.toString())}`);
        dispatch(removeFormData());

      }
    } catch (error: any) {
      setIsLoading(false);
      const { shortMessage, longMessage } = showError(error);
      toast.error(shortMessage);
      Honeybadger.notify(`Creating bet failed with: ${error}`);
    }
  };

  useLayoutEffect(() => {
    if (createBetForm.resultSources.length > 0) {
      setSources([...createBetForm.resultSources]);
    }
    if (createBetForm.isListed)
      setVisibility("Public (Open to all, shown in lobby)");
    else if (createBetForm.isListed === false)
      setVisibility("Private (Invite only, not shown in lobby)");
  }, [createBetForm]);

  return (
    <S.Container>
      <SC.InputContainer>
        <SC.Title>
          Source of results<SC.Required>*</SC.Required>
        </SC.Title>
        {sources.map((source, i) => {
          return (
            <SourceInput
              key={i}
              handleSourceTitleChange={e => handleSourceTitleChange(e, i)}
              handleSourceLinkChange={e => handleSourceLinkChange(e, i)}
              handleRemoveSource={() => handleRemoveSource(i)}
              source={source}
              index={i}
              sourcesLength={sources.length}
            />
          );
        })}
      </SC.InputContainer>
      <SC.InputContainer>
        <SC.AddInputButton
          onClick={() => setSources([...sources, { title: "", url: "" }])}
        >
          Add Sources
        </SC.AddInputButton>
      </SC.InputContainer>
      <SC.InputContainer>
        <SC.Title>
          Visibility<SC.Required>*</SC.Required>
        </SC.Title>
        <SelectButton
          options={[
            "Public (Open to all, shown in lobby)",
            "Private (Invite only, not shown in lobby)",
          ]}
          setOption={setVisibility}
          selectedOption={visibility}
        />
      </SC.InputContainer>
      <Checkbox
        onChange={() => setIsDiscordCheckboxClicked(prevState => !prevState)}
        value={isDiscordCheckboxClicked}
        text={<>I would like to have a <S.Span>Discord</S.Span> channel on my bet</>}
        name='discord-checkbox'
        color='yellow'
      />
      <TermsAndConditions
        setIsCheckboxClicked={setIsTermsCheckboxClicked}
        isCheckboxClicked={isTermsCheckboxClicked}
      />
      <SC.ConfirmButton isDisabled={isLoading} onClick={toggleNextStep}>
        {/* Save and Preview &nbsp; */}
        {isLoading ? (
          <SpinnerDotted
            size={30}
            color="white"
            thickness={200}
            enabled={isLoading}
          />
        ) : (
          'Create bet page'
        )}
      </SC.ConfirmButton>
    </S.Container>
  );
};

export default Other;
