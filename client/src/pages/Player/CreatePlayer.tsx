import React, { useState, useEffect } from "react";
const URL = import.meta.env.VITE_API_URL;

type PlayerRole = "batsman" | "bowler" | "all-rounder";
type Tag = "Player" | "Captain" | "Wise-Captain" | "wicket-keeper";

const CreatePlayer = () => {


    const [player, setPlayer] = useState({
        playername: "",
        role: "" as PlayerRole,
        tags: "Player" as Tag,
        teamId: "",
      });

    const [teams, setTeams] = useState<{ _id: string; teamname: string }[]>([]);


    const fetchTeams = async () => {
    const token = localStorage.getItem("token");


    try {

      const response = await fetch(`${URL}/api/team/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });


      const data = await response.json();

      if (response.ok) setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

    useEffect(() => {
      fetchTeams();
    }, []);


    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(`${URL}/api/player/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(player),
          });
    
          if (response.ok) {
            alert("Player created successfully");
            setPlayer({
              playername: "",
              role: "" as PlayerRole,
              tags: "Player",
              teamId: "",
            });

          } else {
            const data = await response.json();
            alert(data.message || data.msg || "Failed to create player");
          }
        } catch (error) {
          alert("Error: " + error);
        }
      };


  return (
    <div>
        <h2>Create Player</h2>
      <form onSubmit={handleCreate}>
        <label>Player Name:</label>
        <input
          type="text"
          placeholder="Enter Player Name"
          value={player.playername}
          onChange={(e) => setPlayer({ ...player, playername: e.target.value })}
          required
        />

        <label>Role:</label>
        <select
          value={player.role}
          onChange={(e) =>
            setPlayer({ ...player, role: e.target.value as PlayerRole })
          }
          required
        >
          <option value="">Select Role</option>
          <option value="batsman">Batsman</option>
          <option value="bowler">Bowler</option>
          <option value="all-rounder">All-Rounder</option>
        </select>

        <label>Tags:</label>
        <select
          value={player.tags}
          onChange={(e) =>
            setPlayer({ ...player, tags: e.target.value as Tag })
          }
        >
          <option value="Player">Player</option>
          <option value="Captain">Captain</option>
          <option value="Wise-Captain">Wise-Captain</option>
          <option value="wicket-keeper">Wicket-Keeper</option>
        </select>

        <label>Team:</label>
        <select
          value={player.teamId}
          onChange={(e) => setPlayer({ ...player, teamId: e.target.value })}
          required
        >
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.teamname}
            </option>
          ))}
        </select>

        <button type="submit">Create Player</button>
      </form>
    </div>
  )
}

export default CreatePlayer