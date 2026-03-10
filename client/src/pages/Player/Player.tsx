import { useState, useEffect } from "react";

const URL = import.meta.env.VITE_API_URL;

type PlayerRole = "batsman" | "bowler" | "all-rounder" | "";
type Tag = "Player" | "Captain" | "Wise-Captain" | "wicket-keeper" | "";

interface Player {
  _id: string;
  playername: string;
  role: PlayerRole;
  tags: Tag;
  teamId: { _id: string; teamname: string };
}

interface Team {
  _id: string;
  teamname: string;
}

const Player = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  const [formData, setFormData] = useState<{
    playername: string;
    role: PlayerRole;
    tags: Tag;
    teamId: string;
  }>({
    playername: "",
    role: "",
    tags: "",
    teamId: "",
  });

  const token = localStorage.getItem("token");

  const roles: PlayerRole[] = ["batsman", "bowler", "all-rounder"];
  const tags: Tag[] = ["Player", "Captain", "Wise-Captain", "wicket-keeper"];

 
  const fetchPlayers = async () => {
    const response = await fetch(`${URL}/api/player/all/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (response.ok) setPlayers(data);
  };

  
  const fetchTeams = async () => {
    const response = await fetch(`${URL}/api/team/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (response.ok) setTeams(data);
  };

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, []);


  const handleCreate = async () => {
    const response = await fetch(`${URL}/api/player/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Player Created");
      setFormData({ playername: "", role: "", tags: "", teamId: "" });
      fetchPlayers();
    } else {
      alert(data.msg || "Failed");
    }
  };


  const handleEdit = (player: Player) => {
    setEditingPlayer(player);

    setFormData({
      playername: player.playername,
      role: player.role,
      tags: player.tags,
      teamId: player.teamId?._id,
    });
  };


  const handleUpdate = async () => {
    if (!editingPlayer) return;

    const response = await fetch(
      `${URL}/api/player/update/${editingPlayer._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Player Updated");
      setEditingPlayer(null);
      setFormData({ playername: "", role: "", tags: "", teamId: "" });
      fetchPlayers();
    } else {
      alert(data.message || "Update Failed");
    }
  };


  const handleDelete = async (id: string) => {
    const response = await fetch(`${URL}/api/player/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert("Player Deleted");
      fetchPlayers();
    }
  };

  return (
    <div>
      <h2>{editingPlayer ? "Update Player" : "Create Player"}</h2>

      
      <div style={{ marginBottom: "20px" }}>
        
        <input
          type="text"
          placeholder="Player Name"
          value={formData.playername}
          onChange={(e) =>
            setFormData({ ...formData, playername: e.target.value })
          }
        />

    
        <select
          value={formData.role}
          onChange={(e) =>
            setFormData({ ...formData, role: e.target.value as PlayerRole })
          }
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

       
        <select
          value={formData.tags}
          onChange={(e) =>
            setFormData({ ...formData, tags: e.target.value as Tag })
          }
        >
          <option value="">Select Tag</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag === "Wise-Captain" ? "Vice Captain" : tag}
            </option>
          ))}
        </select>

        
        <select
          value={formData.teamId}
          onChange={(e) =>
            setFormData({ ...formData, teamId: e.target.value })
          }
        >
          <option value="">Select Team</option>

          {teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.teamname}
            </option>
          ))}
        </select>

        {editingPlayer ? (
          <>
            <button onClick={handleUpdate}>Update</button>
            <button
              onClick={() => {
                setEditingPlayer(null);
                setFormData({
                  playername: "",
                  role: "",
                  tags: "",
                  teamId: "",
                });
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleCreate}>Create</button>
        )}
      </div>

    
      <h2>Player List</h2>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Player</th>
            <th>Role</th>
            <th>Tags</th>
            <th>Team</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {players.map((p) => (
            <tr key={p._id}>
              <td>{p.playername}</td>
              <td>{p.role}</td>
              <td>{p.tags === "Wise-Captain" ? "Vice Captain" : p.tags}</td>
              <td>{p.teamId?.teamname}</td>

              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Player;