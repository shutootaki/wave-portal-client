import { Contract, ethers } from "ethers";
import abi from "../utils/WavePortal.json";
import { useState } from "react";

type Props = {
  ethereum: typeof window.ethereum;
  messageValue: string;
  setMessageValue: React.Dispatch<React.SetStateAction<string>>;
};

export const useWave = ({ ethereum, messageValue, setMessageValue }: Props) => {
  const contractAddress = "0x986F3d2f4B5d7ac1eF27E93bCa054EA2f05bf526";
  const contractABI = abi.abi;
  const [waveCount, setWaveCount] = useState();

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
        console.log("Total wave count : ", Number(waveCount));

        const waveTxn = await wavePortalContract.wave(messageValue, {
          gasLimit: 300000,
        });

        console.log("Mining now ...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        setWaveCount(await wavePortalContract.getTotalWaves());
        console.log("Total wave count : ", Number(waveCount));
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
