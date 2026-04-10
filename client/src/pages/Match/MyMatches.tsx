import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
const URL = import.meta.env.VITE_API_URL;

interface Match {
    _id: string;
    teamA: { teamname: string };
    teamB: { teamname: string };
    matchDate: string;
    status: string;
}

const MyMatches = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const navigate = useNavigate();

    const fetchMatches = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(`${URL}/api/match/my`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        setMatches(data);
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    const handleViewDetails = async (matchId: string) => {
          const token = localStorage.getItem("token");
          try {
            const res = await fetch(`${URL}/api/match/detail/${matchId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (!res.ok) {
              toast.error(data.message || "Error fetching details");
              return;
            }
            navigate(`/match-details/${matchId}`, { state: data });
          } catch (error) {
            toast.error("Error fetching details: " + error);
          }
        };


    const handleContinue = async (matchId: string) => {
        const token = localStorage.getItem("token");

        const res = await fetch(`${URL}/api/inning/match/${matchId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const innings = await res.json();

        const ongoing = innings.find((i: any) => i.status === "ongoing");

        if (ongoing) {
            navigate(`/live-score/${matchId}/${ongoing._id}`);
        } else {
            toast.error("No ongoing inning found");
        }
    };


    const handleDelete = async (matchId: string) => {
        const token = localStorage.getItem("token");

        if (!confirm("Delete this match?")) return;

        const res = await fetch(`${URL}/api/match/delete/${matchId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
            toast.success("Match deleted successfully");
            fetchMatches();
        }
    };



    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Matches</h2>

            {matches.length === 0 ? (
                <p>No matches found </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 rounded-lg">

                        {/* HEADER */}
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 text-left">Match</th>
                                <th className="p-3 text-left">Match Date</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Actions</th>
                                <th className="p-3 text-left">Match Details</th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody>
                            {matches.map((match) => (
                                <tr key={match._id} className="border-t hover:bg-gray-100">

                                    
                                    <td className="p-3">
                                        {match.teamA.teamname} vs {match.teamB.teamname}
                                    </td>

                                    <td className="p-3">
                                        {new Date(match.matchDate).toLocaleDateString()}
                                    </td>

                                    
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded text-sm font-semibold text-gray-600 `}
                                        >
                                            {match.status.toUpperCase()}
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        <div className="flex gap-2 items-center">
                                            
                                        
                                            <button
                                                className={`px-4 py-1.5 rounded text-sm font-medium transition 
                                                        ${match.status === "live"  
                                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    }`}
                                                disabled={match.status === "finished" || match.status === "upcoming" || match.status === "toss" }
                                                
                                                onClick={() => handleContinue(match._id)}
                                            >
                                                Continue
                                            </button>

                                        
                                            <button
                                                className="px-4 py-1.5 rounded text-sm font-medium bg-red-500 text-white hover:bg-red-700 transition"
                                                onClick={() => handleDelete(match._id)}
                                            >
                                                Delete
                                            </button>

                                            

                                        </div>
                                    </td>
                                    <td>
                                        <button onClick={() => handleViewDetails(match._id)} className="px-4 py-1.5 rounded text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition">
                                                Detail →
                                            </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
};

export default MyMatches;