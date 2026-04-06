// import axios from "axios";
 
// const API = axios.create({
//   baseURL: "http://localhost:8000/api/player-stats",
// });
 
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
 
// // Get player quick stats (career summary only)
// export const getPlayerQuickStats = (playerId: string) => {
//   return API.get(`/quick/${playerId}`);
// };

// // ✅ ADD THIS:
// export const getPlayerAllMatches = (playerId: string) => {
//   return API.get(`/all/${playerId}`);
// };

// // ✅ ADD THIS:
// export const getPlayerMatchDetails = (playerId: string, matchId: string) => {
//   return API.get(`/match/${playerId}/${matchId}`);
// };
 
// export default API;