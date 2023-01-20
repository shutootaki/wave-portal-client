import React, { FC, useCallback } from "react";
import { Wave, getWave } from "../types/waves";
import { ethers } from "ethers";
import abi from "../utils/WavePortal.json";

type Props = {
  ethereum: typeof window.ethereum;
  allWaves: Wave[];
  setAllWaves: React.Dispatch<React.SetStateAction<Wave[]>>;
};

export const useAddNewWave = ({ ethereum, allWaves, setAllWaves }: Props) => {
  const contractAddress = "0x986F3d2f4B5d7ac1eF27E93bCa054EA2f05bf526";
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
  }, [allWaves]);
  return onNewWave;
};
