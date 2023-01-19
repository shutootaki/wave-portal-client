import React, { FC, useCallback } from "react";
import { Wave, getWave } from "../types/waves";
import { ethers } from "ethers";
import abi from "../utils/WavePotal.json";

type Props = {
  ethereum: typeof window.ethereum;
  setAllWaves: React.Dispatch<React.SetStateAction<Wave[]>>;
};

export const useAddNewWave = ({ ethereum, setAllWaves }: Props) => {
  const contractAddress = import.meta.env.CONTAUCT_ADDRESS;
  const contractABI = abi.abi;

  const onNewWave = useCallback(() => {
    ({ from, timestamp, message }: getWave) => {
      console.log("New waved", from, timestamp, message);
      setAllWaves((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);

      if (ethereum && contractAddress) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        wavePortalContract.on("NewWave", onNewWave);

        return () => {
          if (wavePortalContract) {
            wavePortalContract.off("NewWave", onNewWave);
          }
        };
      }
    };
  }, []);
  return { onNewWave };
};
