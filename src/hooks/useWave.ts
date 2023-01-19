import { Contract, ethers } from "ethers";
import abi from "../utils/WavePotal.json";
import { useState } from "react";

export const useWave = (ethereum: typeof window.ethereum) => {
  const contractAddress = import.meta.env.CONTRACT_ADDRESS;
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

        const waveTxn = await wavePortalContract.wave();
        console.log("Mining now ...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        setWaveCount(await wavePortalContract.getTotalWaves());
        console.log("Total wave count : ", Number(waveCount));
      } else {
        console.log("ethereum object dosnt exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { wave, waveCount };
};
