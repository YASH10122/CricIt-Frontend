import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./style/Team.css";

const URL = import.meta.env.VITE_API_URL;

interface Team {
  _id: string;
  teamname: string;
  createdBy: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt: string;
}

const Team = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamname, setTeamname] = useState("");

  // ✅ Fetch Teams
  const fetchTeams = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${URL}/api/team/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTeams(data);
      } else {
        toast.error(data.msg || "Failed to fetch teams");
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  // ✅ Create Team
  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamname.trim()) {
      return toast.error("Team name is required");
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${URL}/api/team/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ teamname }),
      });

      const data = await response.json();

      if (response.ok) {
        setTeamname("");
        toast.success("Team created successfully");

        // 🔥 IMPORTANT: refresh list
        fetchTeams();
      } else {
        toast.error(data.msg || "Failed to create team");
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  // ✅ Delete Team
  const handleDelete = async (teamId: string) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${URL}/api/team/delete/${teamId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Team deleted successfully!");
        fetchTeams();
      } else {
        const data = await response.json();
        toast.error(data.msg || "Failed to delete team");
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="team-page">

      {/* ✅ CREATE TEAM */}
      <div className="create-team-card">
        <h2 className="create-team-title">Create Team</h2>

        <form className="create-team-form" onSubmit={handleCreateTeam}>
          <div className="form-group">
            <label>Enter Team Name</label>
            <input
              type="text"
              placeholder="Team Name"
              value={teamname}
              onChange={(e) => setTeamname(e.target.value)}
            />
          </div>

          <button className="add-team-btn" type="submit">
            Add Team
          </button>
        </form>
      </div>

      {/* ✅ TEAM LIST */}
      <div className="team-list-card">
        <h2 className="team-title">Team List</h2>

        <div className="table-wrapper">
          <table className="team-table">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Created By</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    No teams found
                  </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr key={team._id}>
                    <td>{team.teamname}</td>
                    <td>{team.createdBy.username}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(team._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Team;