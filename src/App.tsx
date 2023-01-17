import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
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
}

export default App;
