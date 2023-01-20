import { useEffect, useState } from "react";
import { useConnectWallet } from "../hooks/useConnectWallet";
import { WaveButton } from "./WaveButton";
import { useWave } from "../hooks/useWave";
import { Wave } from "../types/waves";
import { useAddNewWave } from "../hooks/useAddNewWave";
import { useGetAllWaves } from "../hooks/useGetAllWaves";
import { MessageBox } from "./MessageBox";
import { MessageList } from "./MessageList";

export const WavePage = () => {
  const [currentAccount, setCurrentAccount] = useState<string[]>([""]);
  const [messageValue, setMessageValue] = useState("");
  const [balance, setBalance] = useState("");
  const [allWaves, setAllWaves] = useState<Wave[]>([]);

  const { ethereum } = window;
  console.log(`Current Account: ${currentAccount}`);
  const connectWallet = useConnectWallet({
    ethereum,
    setCurrentAccount,
  });
  const wave = useWave({
    ethereum,
    messageValue,
    setMessageValue,
    balance,
    setBalance,
  });
  const getAllWaves = useGetAllWaves({ ethereum, setAllWaves });
  const onNewWave = useAddNewWave({ ethereum, allWaves, setAllWaves });

  useEffect(() => {
    const chekIfWalletIsConnected = async () => {
      try {
        if (!ethereum) {
          return console.log("make sure you have METAMASK");
        } else {
          onNewWave();
          console.log("We have the ethereum object", ethereum);
        }

        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts[0] === null) {
          console.log("no authorized account found");
        } else if (accounts !== 0) {
          const account = accounts[0];
          console.log(`your account: ${account}`);
          setCurrentAccount(account);
          getAllWaves();
        }
      } catch (error) {
        console.log(error);
      }
    };
    chekIfWalletIsConnected();
  }, []);
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          <span role="img" aria-vabel="hand-wave">
            👋
          </span>
          WELCOM!
        </div>
        <div className="bio">
          イーサリアムウォレットを接続して、メッセージを作成したら、
          <span role="img" aria-label="hand-wave">
            👋
          </span>
          を送ってね
          <span role="img" aria-label="shine">
            ✨
          </span>
        </div>
        {currentAccount && (
          <MessageBox
            messageValue={messageValue}
            setMesasgeValue={setMessageValue}
          />
        )}
        <WaveButton onClick={wave}>Wave at Me</WaveButton>
        <WaveButton onClick={connectWallet}>
          {currentAccount ? "Wallet Connected" : "Connect Wallet"}
        </WaveButton>
        {currentAccount &&
          allWaves
            .slice(0)
            .reverse()
            .map((wave, index) => {
              return <MessageList wave={wave} index={index} />;
            })}
      </div>
    </div>
  );
};
