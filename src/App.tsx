import { ethers } from "ethers";
import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState([""]);
  console.log(`Current Account: ${currentAccount}`);

  const chekIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        return console.log("make sure you have METAMASK");
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts !== 0) {
        const account = accounts[0];
        console.log(`your account: ${account}`);
      } else {
        console.log("no authorized account found");
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
          を送ってください
          <span role="img" aria-label="shine">
            ✨
          </span>
        </div>
        <button className="waveButton">Wave at Me</button>
      </div>
    </div>
  );
};

export default App;
