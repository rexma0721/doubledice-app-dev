import { useState } from "react"

// Utils
import { IoMdClose } from "react-icons/io";

// Components
import Checkbox from "../CheckBox"
import * as S from "./StyledComponents"
import * as SC from 'components/shared/StyledComponents';
import Portal from "components/shared/Portal"


interface PropsI {
  isCheckboxClicked: boolean
  setIsCheckboxClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const TermsAndConditions = ({ isCheckboxClicked, setIsCheckboxClicked }: PropsI) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <>
      <Checkbox
        onChange={() => setIsCheckboxClicked(!isCheckboxClicked)}
        value={isCheckboxClicked}
        name={'terms-and-agreements-checkbox'}
        text={
          <>
            Agree to <S.Button onClick={() => setIsModalOpen(true)}>Ts and Cs</S.Button>
          </>
        }
        color='yellow'
      />
      {isModalOpen && (
        <Portal>
          <>
            <SC.Background />
            <S.Modal>
              <S.ModalWrapper>
                <S.IconButton onClick={() => setIsModalOpen(false)}>
                  <IoMdClose color='rgba(0, 0, 0, 0.6)' size={25} />
                </S.IconButton>
                <S.ModalTitle>Terms and Conditions</S.ModalTitle>
                <S.TextBox>
                  <S.Text>
                    DDVFS is a decentralized IPFS and smart contracts-based community deployment of user generated content utilizing the DoubleDice smart contracts/tech stack.<br />
                    Welcome to ddvfs.com (the "DDVFS Site"). The DDVFS Site is provided to you subject to the following terms of use conditioned on your acceptance without
                    modification of the terms, conditions, and notices contained herein (the "Terms"). Your use of the DDVFS Site constitutes your agreement to all such Terms.
                    Please read these terms carefully and keep a copy of them for your reference. DDVFS makes no money from the DDVFS site, or from the prediction
                    markets created by the users of the DDVFS site.
                  </S.Text><br />
                  <S.Text>
                    Neither the DDVFS site or DoubleDice have any role in the operation of markets created using the DoubleDice smart contracts,
                    and do not have the ability to spend funds that are held in escrow on-contract, do not control how markets are being created,
                    do not approve or reject trades or other transactions on the network, and do not have the ability to modify, cancel, undo,
                    or interact with orders on the network.
                  </S.Text><br />
                  <S.Text>
                    PLEASE READ THESE TERMS CAREFULLY. THESE TERMS OF USE GOVERN THE USE OF THE DDVFS SITE AND APPLY TO ALL INTERNET USERS VISITING
                    THE DDVFS SITE BY ACCESS OR USING THE DDVFS SITE IN ANY WAY, INCLUDING USING THE SERVICES AND RESOURCES AVAILABLE OR ENABLED VIA
                    THE DDVFS SITE (EACH A "SERVICE" AND COLLECTIVELY, THE "SERVICES"). BY BROWSING THE DDVFS SITES, YOU REPRESENT THAT (1) YOU HAVE
                    READ, UNDERSTAND, AND AGREE TO BE BOUND BY THE TERMS OF USE, (2) YOU ARE OF LEGAL AGE TO FORM A BINDING CONTRACT WITH DDVFS,
                    AND (3) YOU HAVE THE AUTHORITY TO ENTER INTO THE TERMS OF USE PERSONALLY OR ON BEHALF OF COMPANY YOU REPRESENT, AND TO BIND THAT
                    COMPANY TO THE TERMS OF USE. THE TERM "YOU" REFERS TO THE INDIVIDUAL OR LEGAL ENTITY, AS APPLICABLE. IF YOU DO NOT AGREE TO BE
                    BOUND BY THE TERMS OF USE, YOU MAY NOT ACCESS OR USE THIS DDVFS SITE OR THE SERVICES.
                  </S.Text><br />

                  <S.Title>Electronic Communications</S.Title><br />


                  <S.Text>
                    Visiting the DDVFS Site or any social channels/media constitutes electronic communications.
                    You consent to receive electronic communications and you agree that all agreements, notices,
                    disclosures, and other communications that we provide to you electronically, via the DDVFS Site,
                    satisfy any legal requirement that such communications be in writing. The foregoing does not affect your statutory rights.
                  </S.Text><br />

                  <S.Text>
                    DDVFS Site do not knowingly collect, either online or offline, personal information from any persons,
                    including those under the age of eighteen. If you are under 18, you may not use the DDVFS Site or enter into a Customer Agreement.
                  </S.Text><br />
                  <S.Title>Updates</S.Title><br />

                  <S.Text>
                    You understand that the DDVFS Site and the related services are evolving. As a result,
                    you may be required to accept updates to the DDVFS Site and the related services that you have previously
                    installed or used. You acknowledge and agree that any website, documents or services may be updated without notifying you.
                    You may need to update third-party software from time to time to use some or all the features and services offered.
                  </S.Text><br />

                  <S.Title>Third Party Services</S.Title><br />

                  <S.Text>
                    The DDVFS Site may contain links to other websites ("Linked Sites"). The Linked Sites are not under the control of
                    DoubleDice or DDVFS Site and are not responsible for the contents of any Linked Site, including without limitation
                    any link contained in a Linked Site, or any changes or updates to a Linked Site. When you click on a link to a Linked Site,
                    we may not warn you that you have left the DDVFS Site and are subject to the terms and conditions
                    (including privacy policies) of another website or destination. DDVFS Site is providing these links to you only
                    as a convenience, and the inclusion of any link does not imply endorsement by DDVFS Site of the site or any association
                    with its operators. You use the Linked Sites at your own risk. When you leave the DDVFS Site, our Terms and policies
                    no longer govern. You should review applicable terms and policies, including privacy and data gathering practices,
                    of the Linked Sites, and should make whatever investigation you feel necessary or appropriate before proceeding
                    with any transaction with any third party.
                  </S.Text><br />
                  <S.Text>
                    Certain services made available via the DDVFS Site are delivered by third party sites and organizations.
                  </S.Text><br />


                  <S.Title>Prohibited Uses and Intellectual Property</S.Title> <br />

                  <S.Text>
                    You are granted a non-exclusive, non-transferable, revocable license to access and use DDVFS Site strictly
                    in accordance with these terms of use. As a condition of your use of the DDVFS Site, you warrant to DDVFS
                    Site that you will not use the DDVFS Site for any purpose that is unlawful or prohibited by these Terms.
                    You may not use the DDVFS Site in any manner that could damage, disable, overburden, or impair the DDVFS
                    Site or interfere with any other party's use and enjoyment of the DDVFS Site. You may not obtain or attempt
                    to obtain any materials or information through any means not intentionally made available or provided for
                    through the DDVFS Site.
                  </S.Text><br />

                  <S.Text>
                    All content, excluding the content contained in the Virtual floors (prediction markets) created by
                    the community and public at large, included on the DDVFS Site, such as text, graphics, logos, images,
                    as well as the compilation thereof, and any software used on the DDVFS Site , is the property of DDVFS
                    Site or its suppliers and protected by laws that protect intellectual property and proprietary rights.
                    You agree to observe and abide by all copyright and other proprietary notices, legends or other restrictions
                    contained in any such content and will not make any changes thereto.
                  </S.Text><br />

                  <S.Text>
                    You will not modify, publish, transmit, reverse engineer, participate in the transfer or sale,
                    create derivative works, or in any way exploit any of the content, in whole or in part,
                    found on the DDVFS Site. Your use of the DDVFS Site does not entitle you to make any unauthorized
                    use of any protected content, and in particular you will not delete or alter any proprietary rights
                    or attribution notices in any content. You will use protected content solely for your personal use,
                    and will make no other use of the content without the express written permission of DDVFS Site and
                    the copyright owner. You agree that you do not acquire any ownership rights in any protected content.
                  </S.Text><br />

                  <S.Text>
                    Unless otherwise indicated, all DDVFS Site content is the property of the DDVFS Site or third-party licensors.
                  </S.Text><br />


                  <S.Title>User responsibility</S.Title><br />

                  <S.Text>
                    DDVFS Site may be accessed from countries around the world and may contain references to Services and content
                    that are not available in your country. DDVFS Site make no representations that the DDVFS Site is appropriate
                    or available for use in other locations. Those who access or use the Services or content from other countries
                    do so at their own volition and are responsible for compliance with local law.
                  </S.Text><br />

                  <S.Title>Indemnification</S.Title><br />

                  <S.Text>
                    You agree to indemnify, defend and hold harmless DDVFS Site , its officers, directors, employees,
                    agents and third parties, at all times and in all situations, for any losses, costs,
                    liabilities and expenses (including reasonable attorneys' fees) relating to or arising out of your use
                    of or inability to use the DDVFS Site and its services, any postings or submissions made by you or other users,
                    your violation of any terms of this Agreement or your violation of any rights, including intellectual property rights,
                    of a third party, or your violation of any applicable laws, rules or regulations. DDVFS Site reserve the right,
                    at its own cost, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you,
                    in which event you will fully cooperate with DDVFS Site in asserting any available defenses.
                  </S.Text><br />


                  <S.Text>
                    You agree to indemnify, defend and hold harmless DoubleDice and DDVFS Site , its officers, directors, employees,
                    agents and third parties, at all times and in all situations, for any losses, costs, liabilities and expenses
                    (including reasonable attorneys' fees) relating to or arising out of the community led and admin led Bet resolution
                    mechanisms.<br />
                    <S.ListWrapper>
                      <li> You agree and accept the Bet Resolution Mechanism, which is governed by community led and game theory-based mechanisms
                        to incentivize good behavior on the part of all participants.</li><br />
                      <li> You agree and accept that in case of disputes relating to the results of the Virtual floors and prediction markets,
                        the admin or a community jury will set the binding results. DoubleDice, DDVFs or its admins have zero incentive to
                        choose an incorrect outcome as there is no financial gain to be made in doing so.</li><br />
                    </S.ListWrapper>
                  </S.Text>
                  <S.Title>Disclaimer of Certain Liabilities</S.Title><br />

                  <S.Text>
                    THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE DDVFS SITE MAY INCLUDE
                    INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN. DDVFS Site AND/OR
                    ITS SUPPLIERS MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THE DDVFS SITE AT ANY TIME.
                  </S.Text><br />

                  <S.Text>
                    DDVFS SITE AND/OR ITS SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS,
                    AND ACCURACY OF THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS CONTAINED ON THE D DDVFS SITE
                    FOR ANY PURPOSE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION, SOFTWARE, PRODUCTS,
                    SERVICES AND RELATED GRAPHICS ARE PROVIDED "AS IS" WITHOUT WARRANTY OR CONDITION OF ANY KIND. DDVFS Site AND/OR
                    ITS SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS,
                    SERVICES AND RELATED GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR
                    A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT.
                  </S.Text><br />

                  <S.Text>
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL DDVFS SITE AND/OR ITS SUPPLIERS BE LIABLE
                    FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER INCLUDING,
                    WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE
                    OR PERFORMANCE OF THE DDVFS SITE , WITH THE DELAY OR INABILITY TO USE THE DDVFS Site OR RELATED SERVICES,
                    THE PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND
                    RELATED GRAPHICS OBTAINED THROUGH THE DDVFS Site , OR OTHERWISE ARISING OUT OF THE USE OF THE DDVFS SITE,
                    WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF DDVFS SITE OR ANY OF
                    ITS SUPPLIERS HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES. IF YOU ARE DISSATISFIED WITH ANY PORTION OF
                    THE DDVFS SITE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE DDVFS SITE.
                  </S.Text><br />

                  <S.Title>Termination/Access Restriction</S.Title><br />

                  <S.Text>
                    DDVFS Site reserve the right, in their sole discretion, to terminate your access to the DDVFS Site and its related
                    services or any portion thereof at any time, without notice.
                  </S.Text><br />

                  <S.Text>
                    You agree that no joint venture, partnership, employment, or agency relationship exists between you and DDVFS Site
                    as a result of this agreement or use of the DDVFS Site. DDVFS Site performance of this agreement is subject to
                    existing laws and legal process, and nothing contained in this agreement is in derogation of DDVFS Site right to
                    comply with governmental, court and law enforcement requests or requirements relating to your use of the DDVFS Site
                    or information provided to or gathered by DDVFS Site with respect to such use. If any part of this agreement is
                    determined to be invalid or unenforceable pursuant to applicable law including, but not limited to, the warranty
                    disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed
                    superseded by a valid, enforceable provision that most closely matches the intent of the original provision and
                    the remainder of the agreement shall continue in effect.
                  </S.Text><br />

                  <S.Text>
                    Unless otherwise specified herein, this agreement constitutes the entire agreement between the user and DDVFS Site
                    with respect to the DDVFS Site and it supersedes all prior or contemporaneous communications and proposals, whether
                    electronic, oral or written, between the user and DDVFS Site with respect to the DDVFS Site, except for any Customer
                    Agreement into which you enter with DDVFS Site. In the case of any conflict, the terms of that Customer Agreement
                    will control. A printed version of this agreement and of any notice given in electronic form shall be admissible
                    in judicial or administrative proceedings based upon or relating to this agreement to the same extent and subject
                    to the same conditions as other business documents and records originally generated and maintained in printed form.
                    It is the express wish to the parties that this agreement and all related documents be written in English.
                  </S.Text><br />

                  <S.Title>Assignment</S.Title><br />

                  <S.Text>
                    The Terms, and your rights and obligations hereunder, may not be assigned, subcontracted, delegated or
                    otherwise transferred by you without prior written consent from DDVFS Site, and any attempted assignment,
                    subcontract, delegation, or transfer in violation of the foregoing will be null and void.
                  </S.Text><br />


                  <S.Title>Changes to Terms</S.Title><br />

                  <S.Text>
                    DDVFS Site reserve the right, in its sole discretion, to change the Terms under which DDVFS Site are offered.
                    The most current version of the Terms will supersede all previous versions. DDVFS Site encourage you to periodically
                    review the Terms to stay informed of our updates.
                  </S.Text><br />


                  <S.Title>Contact Us</S.Title><br />

                  <S.Text>
                    DDVFS Site welcomes your questions or comments regarding the Terms via the flagging mechanism embedded in
                    the Virtual floors
                  </S.Text><br />

                </S.TextBox>
                <S.ModalButton onClick={() => {
                  setIsCheckboxClicked(true)
                  setIsModalOpen(false)
                }}>
                  I accept the terms and conditions
                </S.ModalButton>
              </S.ModalWrapper>
            </S.Modal>
          </>
        </Portal>
      )}
    </>
  );
};
export default TermsAndConditions;
