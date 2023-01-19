import { ethers } from "ethers";
import { useState } from "react";
import abi from "../utils/WavePotal.json";
import { Wave, getWave } from "../types/waves";

export const useGetAllWaves = async (ethereum: typeof window.ethereum) => {
  const contractAddress = process.env.CONTAUCT_ADDRESS
    ? process.env.CONTAUCT_ADDRESS
    : "";
  const contractABI = abi.abi;
  const [allWaves, setAllWaves] = useState<Wave[]>([]);

  try {
    if (!ethereum) return console.log("Ethereum object doesnt exist!");
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const wavePortalContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    const waves = await wavePortalContract.getAllWaves();
    const wavesCleaned: Wave[] = waves.map((wave: any) => {
      return {
        address: wave.waver,
        timestamp: new Date(wave.timestamp * 1000),
        message: wave.message,
      };
    });

    setAllWaves(wavesCleaned);
  } catch (error) {
    console.log(error);
  }

  return { allWaves };
};
