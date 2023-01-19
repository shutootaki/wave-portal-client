import React, { useEffect, useState } from "react";
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
  const [messageValue, setMesasgeValue] = useState("");
  const [allWaves, setAllWaves] = useState<Wave[]>([]);

  const { ethereum } = window;
  console.log(`Current Account: ${currentAccount}`);
  const connectWallet = useConnectWallet({
    ethereum,
    setCurrentAccount,
  });
  const { wave } = useWave({ ethereum, messageValue });
  const getAllWaves = useGetAllWaves({ ethereum, setAllWaves });
  const onNewWave = useAddNewWave({ ethereum, setAllWaves });

  const chekIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return console.log("make sure you have METAMASK");
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts[0] === undefined) {
        console.log("no authorized account found");
      } else if (accounts !== 0) {
        const account = accounts[0];
        console.log(`your account: ${account}`);
        setCurrentAccount(account);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
            setMesasgeValue={setMesasgeValue}
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
