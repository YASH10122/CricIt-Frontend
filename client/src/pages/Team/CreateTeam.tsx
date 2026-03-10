import { useState } from "react";
const URL = import.meta.env.VITE_API_URL;

import React from "react";

const CreateTeam = () => {
  const [teamname, setTeamname] = useState("");

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const responce = await fetch(`${URL}/api/team/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ teamname }),
      });

      const data = await responce.json();

      if (responce.ok) {
        setTeamname("");
        alert("team created successfully");
      } else {
        alert(data.msg || "failed to create team &  login first");
      }
    } catch (error) {
      alert(`error: ${error}`);
    }
  };

  return (
    <div>
      <h2>Create Team</h2>
      <form onSubmit={handleCreateTeam}>
        <label>Enter Teamm Name:- </label>
        <input
          type="text"
          placeholder="Team Name"
          value={teamname}
          onChange={(e) => setTeamname(e.target.value)}
        />
        <button type="submit">Add Team</button>
      </form>
    </div>
  );
};

export default CreateTeam;
