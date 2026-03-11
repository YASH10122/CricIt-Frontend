import React, { useEffect, useState } from 'react'

const URL = import.meta.env.VITE_API_URL;

type MatchType = "odi" | "t20" | "box" | "simple";

interface Team {
    _id: string;
    teamname :string;
}
const CreateMatch = () => {



    const matchtypes: MatchType[] = ["odi", "t20", "simple", "box"]

    const [team, setTeam]= useState<Team[]>([]);
    const [formData, setFormData] = useState<{
        teamA: string;
        teamB: string;
        venue: string;
        matchDate: string;
        matchType: string;
        totalOverInMatch: number;
    }>({
        teamA: '',
        teamB: '',
        venue: '',
        matchDate: '',
        matchType: '',
        totalOverInMatch: 20,
    });


    const token = localStorage.getItem("token");


    const fetchTeam = async () => {


        const responce = await fetch(`${URL}/api/team/all`, {
            headers: { Authorization: `Bearer ${token}`}
        });

        const data = await responce.json();
        setTeam(data);
    }

    useEffect(() => {
        fetchTeam();
    }, []);


    const handleCreateMatch = async(e: React.FormEvent) => {
        e.preventDefault();
        
        const responce = await fetch(`${URL}/api/match/create`, {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                 Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData)
        });

        const data = await responce.json();

        if(responce.ok){
            alert("match Created");
            setFormData({teamA: '', teamB: '', venue: '', matchDate: '', matchType: '', totalOverInMatch: 20})

        }else{
             alert(data.msg || "Failed");
        }
    }

    
  return (
    <div>
        <h2>Create New Match</h2>
        <form onSubmit={handleCreateMatch}>
            <label>Select 1 Team</label>
            <select value={formData.teamA} onChange={(e) => setFormData({...formData,  teamA: e.target.value})}>

                <option value="">Select</option>
                {team.map((team)=> (
                    <option key= {team._id} value={team._id}>
                        {team.teamname}
                    </option>
                ))}
            </select>

            <label>Select 2 Team</label>
            <select value={formData.teamB} onChange={(e) => setFormData({...formData, teamB: e.target.value})}>
            <option value="">Select</option>
                {team.map((team)=> (
                    <option key= {team._id} value={team._id}>
                        {team.teamname}
                    </option>
                ))}
            </select>
            
            <label>Enter Venue</label>
            <input type="text" placeholder='Enter Venue' value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} />
            
            <label>Match Date</label>
            <input type="date" value={formData.matchDate} onChange={(e) => setFormData({...formData, matchDate: e.target.value})} />

            <label >Select Match Type</label>
            <select value={formData.matchType} onChange={(e) => setFormData({...formData, matchType:e.target.value as MatchType})}>
                <option value="">Select</option>
                {matchtypes.map((type) => (
                    <option value={type} key={type}>
                        {type}
                    </option>
                ))}
            </select>

            <input type="number" placeholder='Total Number of overs' value={formData.totalOverInMatch } onChange={(e) => setFormData({...formData, totalOverInMatch: Number(e.target.value)})} />

            <button type="submit">Create Match</button>
        </form>
    </div>
  )
}

export default CreateMatch;