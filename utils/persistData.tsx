import React from "react";

// Utils
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import styled from "styled-components";
import { supernova } from "styles/colors";


export const PENDING_TRANSACTION = "PENDING_TRANSACTION";

const ATag = styled.a`
  margin-left: 0.5rem;
  color: blue;
`

const persistData = (msg: string, link: string, hash: string) => {
  reactLocalStorage.setObject(PENDING_TRANSACTION, {
    txHash: hash,
    msg
  });

  const message = 
    <div>
        {msg}
        <ATag href={link} target='_blank'>Link</ATag>
    </div>
  
  toast.info(message, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export default persistData