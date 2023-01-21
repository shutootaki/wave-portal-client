import { Contract, ethers } from "ethers";
import abi from "../utils/WavePortal.json";
import { useState } from "react";

type Props = {
  ethereum: typeof window.ethereum;
  messageValue: string;
  setMessageValue: React.Dispatch<React.SetStateAction<string>>;
  balance: any;
  setBalance: React.Dispatch<React.SetStateAction<any>>;
};

export const useWave = ({
  ethereum,
  messageValue,
  setMessageValue,
  balance,
  setBalance,
}: Props) => {
  const contractAddress = "0x889bC1D62831dDaF42F961F4B5027486240C6F40";
  const contractABI = abi.abi;
  const [waveCount, setWaveCount] = useState<any>();

  const wave = async () => {
    try {
      if (ethereum && contractAddress) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setWaveCount(await wavePortalContract.getTotalWaves());
        waveCount && console.log("Total wave count : ", waveCount.toNumber());

        const waveTxn = await wavePortalContract.wave(messageValue, {
          gasLimit: 300000,
        });

        setBalance(await provider.getBalance(wavePortalContract.address));

        console.log("Mining now ...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        setWaveCount(await wavePortalContract.getTotalWaves());
        waveCount && console.log("Total wave count : ", waveCount.toNumber());

        let contractBlancePost = await provider.getBalance(
          wavePortalContract.address
        );

        if (contractBlancePost.lt(balance)) {
          console.log("User won ETH!");
        } else {
          console.log("User didnt win ETH...");
        }

        setMessageValue("");
      } else {
        console.log("ethereum object dosnt exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return wave;
};
