import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const URL = import.meta.env.VITE_API_URL;

const LiveScore = () => {

    const {matchId, inningId} = useParams();

    const [score , setScore] = useState<any>({});
    const [overBall, setOverBall] = useState<string[]>([]);
    const [players, setPlayers] = useState<any[]>([]);
    const [inningInfo, setInningInfo] = useState<any>({});
    const [commentry, setCommentry] = useState<string[]>([]);

    const [wicket , setWicket] = useState(false);
    const [bowler, setBowler] = useState(false);

    const [wicketData, setWicketData] = useState({
        wicketType : "",
        outPlayer : "",
        newBatsman : ""
    });

    const [newBowler, setNewBowler] = useState("");
 
    const loadData = async () => {
        const scoreRes = await axios.get(`${URL}/api/ball/score/${inningId}`);
        setScore(scoreRes.data);

        const commentryRes = await axios.get(`${URL}/api/ball/commentry/${inningId}`);
        setCommentry(commentryRes.data);

        const overRes = await axios.get(`${URL}/api/ball/overs/${inningId}`);
        setOverBall(overRes.data);

        const playerRes = await axios.get(`${URL}/api/player`);
        setPlayers(playerRes.data);

        const inningRes = await axios.get(`${URL}/api/inning/${inningId}`);
        setInningInfo(inningRes.data);
    }

    useEffect(() => {
        loadData();

    }, [])

    const addBall = async (data:any) => {
        await axios.post(`${URL}/api/ball/${matchId}/${inningId}`, data);
        loadData();
    }

    const undoBall = async () => {
    await axios.delete (`${URL}/api/ball/undo/${inningId}`);
    loadData();
    };

    const confirmWicket = () => {
        addBall({
            isWicket: true,
            wicketType: wicketData.wicketType,
            outPlayer: wicketData.outPlayer,
            newBatsman: wicketData.newBatsman,
        });
        setWicket(false);
    }

    const changeBowler = async () => {
    await axios.put(`${URL}/api/inning/change-bowler/${inningId}`, {
      bowlerId: newBowler
    });
    setBowler(false);
    loadData();
  };

  const rrr =
    inningInfo.target && score.overs
      ? ((inningInfo.target - score.runs) /
          (inningInfo.totalOvers - parseFloat(score.overs))).toFixed(2)
      : null;


  return (
     <>
     </>
  )
}

export default LiveScore;







































































































// <div className="bg-gray-900 min-h-screen text-white p-6">

//       <h1 className="text-3xl text-center mb-4 font-bold">LIVE SCORING</h1>

//       {/*  SCOREBOARD */}
//       <div className="bg-black p-4 rounded mb-4 text-center">
//         <h2 className="text-4xl font-bold">
//           {score.runs} / {score.wickets}
//         </h2>
//         <p>Overs : {score.overs}</p>

//         {inningInfo.target && (
//           <>
//             <p>Target : {inningInfo.target}</p>
//             <p>Req Run Rate : {rrr}</p>
//           </>
//         )}
//       </div>

//       {/*  BATSMAN INFO */}
//       <div className="flex justify-around mb-4">
//         <div className="text-green-400 font-bold">
//            {inningInfo.strikerName}
//         </div>
//         <div>{inningInfo.nonStrikerName}</div>
//         <div className="text-yellow-400">
//           Bowler : {inningInfo.bowlerName}
//         </div>
//       </div>

//       {/*  RUN BUTTONS */}
//       <div className="grid grid-cols-4 gap-3 mb-6">
//         {[0,1,2,3,4,6].map(r => (
//           <button
//             key={r}
//             onClick={() => addBall({ runsScored: r })}
//             className="bg-green-600 p-4 rounded text-xl"
//           >
//             {r}
//           </button>
//         ))}

//         <button
//           onClick={() => setWicket(true)}
//           className="bg-red-600 p-4 rounded"
//         >
//           W
//         </button>

//         <button
//           onClick={() => addBall({ extraType:"wide", extraRuns:1 })}
//           className="bg-yellow-600 p-4 rounded"
//         >
//           WD
//         </button>

//         <button
//           onClick={() => addBall({ extraType:"no-ball", extraRuns:1 })}
//           className="bg-yellow-600 p-4 rounded"
//         >
//           NB
//         </button>

//         <button
//           onClick={() => setBowler(true)}
//           className="bg-purple-600 p-4 rounded"
//         >
//           Change Bowler
//         </button>

//         <button
//           onClick={undoBall}
//           className="bg-blue-600 p-4 rounded"
//         >
//           UNDO
//         </button>
//       </div>

//       {/*  OVER SUMMARY */}
//       <div className="bg-gray-800 p-3 rounded mb-4">
//         <h3 className="mb-2">Current Over</h3>
//         <div className="flex gap-2">
//           {overBall.slice(-6).map((b:any,i:number)=>(
//             <span key={i} className="bg-gray-600 px-3 py-1 rounded">
//               {b.isWicket ? "W" : b.runsScored}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/*  SCORECARD TABLE */}
//       <div className="bg-gray-800 p-4 rounded mb-4">
//         <h3 className="mb-2">Scorecard</h3>
//         {inningInfo.batsmen?.map((p:any)=>(
//           <div key={p._id} className="flex justify-between border-b py-1">
//             <span>{p.name}</span>
//             <span>{p.runs} ({p.balls})</span>
//           </div>
//         ))}
//       </div>

//       {/*  COMMENTARY */}
//       <div className="bg-gray-800 p-4 rounded h-64 overflow-y-scroll">
//         <h3>Commentary</h3>
//         {commentry.map((c,i)=>(
//           <p key={i} className="border-b py-1">{c}</p>
//         ))}
//       </div>

//       {/*  WICKET MODAL */}
//       {wicket && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
//           <div className="bg-white text-black p-6 rounded">
//             <select
//               className="border p-2 mb-2 w-full"
//               onChange={(e)=>setWicketData({...wicketData,outPlayer:e.target.value})}
//             >
//               <option>Select Out Player</option>
//               {players.map((p:any)=>(
//                 <option value={p._id}>{p.playername}</option>
//               ))}
//             </select>

//             <select
//               className="border p-2 mb-2 w-full"
//               onChange={(e)=>setWicketData({...wicketData,newBatsman:e.target.value})}
//             >
//               <option>Select New Batsman</option>
//               {players.map((p:any)=>(
//                 <option value={p._id}>{p.playername}</option>
//               ))}
//             </select>

//             <button
//               onClick={confirmWicket}
//               className="bg-red-600 text-white p-2 rounded"
//             >
//               Confirm
//             </button>
//           </div>
//         </div>
//       )}

//       {/*  BOWLER MODAL */}
//       {bowler && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
//           <div className="bg-white text-black p-6 rounded">
//             <select
//               className="border p-2 mb-2 w-full"
//               onChange={(e)=>setNewBowler(e.target.value)}
//             >
//               <option>Select Bowler</option>
//               {players.map((p:any)=>(
//                 <option value={p._id}>{p.playername}</option>
//               ))}
//             </select>

//             <button
//               onClick={changeBowler}
//               className="bg-purple-600 text-white p-2 rounded"
//             >
//               Change
//             </button>
//           </div>
//         </div>
//       )}

//     </div>