import { ethers } from "ethers";
import abi from "../utils/WavePortal.json";
import { Wave, getWave } from "../types/waves";

type Props = {
  ethereum: typeof window.ethereum;
  setAllWaves: React.Dispatch<React.SetStateAction<Wave[]>>;
};

export const useGetAllWaves = ({ ethereum, setAllWaves }: Props) => {
  const getAllWaves = async () => {
    const contractAddress = "0x889bC1D62831dDaF42F961F4B5027486240C6F40";
    const contractABI = abi.abi;

    try {
      if (!ethereum) return console.log("Ethereum object doesnt exist!");
      if (contractAddress === undefined) return null;
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
  };
  return getAllWaves;
};
