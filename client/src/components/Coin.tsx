import React, { useState } from "react";

import './Style/Coin.css'

const CoinToss: React.FC = () => {
  const [result, setResult] = useState<"heads" | "tails" | "">("");

  const coinToss = () => {
    const toss = Math.random() < 0.5 ? "heads" : "tails";
    setResult(toss);
    console.log(toss);
  };

  return (
    <div className="App">
      

      
      <div id="coin" className={result} onClick={coinToss}>
        <div className="side-a">
          <h2>TAIL</h2>
        </div>

        <div className="side-b">
          <h2>HEAD</h2>
        </div>
      </div>
    </div>
  );
};

export default CoinToss;