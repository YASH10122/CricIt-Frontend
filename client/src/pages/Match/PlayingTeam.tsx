









































































// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// interface Player {
//   _id: string;
//   playername: string;
// }

// interface Match {
//   teamA: { _id: string; teamname: string };
//   teamB: { _id: string; teamname: string };
// }

// const PlayingTeam: React.FC = () => {
//   const { matchId } = useParams();

//   const [match, setMatch] = useState<Match | null>(null);
//   const [teamAPlayers, setTeamAPlayers] = useState<Player[]>([]);
//   const [teamBPlayers, setTeamBPlayers] = useState<Player[]>([]);

//   const [selectedA, setSelectedA] = useState<string[]>([]);
//   const [selectedB, setSelectedB] = useState<string[]>([]);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     loadMatch();
//   }, []);

//   const loadMatch = async () => {
//     const res = await axios.get(
//       `http://localhost:8000/api/match/detail/${matchId}`
//     );

//     const matchData = res.data;
//     setMatch(matchData);

// loadPlayers(matchData.teamA._id, "A");
// loadPlayers(matchData.teamB._id, "B");
//   };

//   const loadPlayers = async (teamId: string, type: string) => {
//     const res = await axios.get(
//       `http://localhost:8000/api/player/team/${teamId}`
//     );

//     console.log("Players API Response:", res.data);

//     if (type === "A") setTeamAPlayers(res.data);
//     else setTeamBPlayers(res.data);
//   };

//   const selectPlayer = (id: string, team: string) => {
//     if (team === "A") {
//       if (selectedA.includes(id)) {
//         setSelectedA(selectedA.filter((x) => x !== id));
//       } else {
//         setSelectedA([...selectedA, id]);
//       }
//     } else {
//       if (selectedB.includes(id)) {
//         setSelectedB(selectedB.filter((x) => x !== id));
//       } else {
//         setSelectedB([...selectedB, id]);
//       }
//     }
//   };

//   const submitTeam = async () => {
//     await axios.post(
//       `http://localhost:8000/api/match/team/${matchId}`,
//       {
//         playingTeamA: selectedA,
//         playingTeamB: selectedB,
//       },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     alert("Playing Team Saved");
//   };

//   if (!match) return <h2>Loading...</h2>;

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Select Playing Team</h1>

//       <div style={{ display: "flex", gap: 50 }}>
//         <div>
//           <h2>Team A</h2>
//           {teamAPlayers.map((p) => (
//             <div key={p._id}>
//               <input
//                 type="checkbox"
//                 onChange={() => selectPlayer(p._id, "A")}
//               />
//               {p.playername}
//             </div>
//           ))}
//         </div>

//         <div>
//           <h2>Team B</h2>
//           {teamBPlayers.map((p) => (
//             <div key={p._id}>
//               <input
//                 type="checkbox"
//                 onChange={() => selectPlayer(p._id, "B")}
//               />
//               {p.playername}
//             </div>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={submitTeam}
//         style={{ marginTop: 20, padding: 10 }}
//       >
//         Save Playing Team
//       </button>
//     </div>
//   );
// };

// export default PlayingTeam;