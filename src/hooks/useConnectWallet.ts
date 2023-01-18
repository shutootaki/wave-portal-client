import React, { FC } from "react";

export const useConnectWallet = (
  setCurrentAccount: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const { ethereum } = window;

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Get MetaMask!");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return connectWallet;
};
