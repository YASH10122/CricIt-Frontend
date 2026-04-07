import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/PlayerHistory.css";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_API_URL;

const PlayerHistory = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${URL}/api/player/history/player/${playerId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error fetching player history" + err.message);
        setLoading(false);
      });
  }, [playerId]);

  // Calculate stats
  const stats = {
    totalMatches: data.length,
    totalRuns: data.reduce((sum, d) => sum + (d.battingRuns || 0), 0),
    totalBalls: data.reduce((sum, d) => sum + (d.battingBalls || 0), 0),
    totalWickets: data.reduce((sum, d) => sum + (d.wickets || 0), 0),
    totalFours: data.reduce((sum, d) => sum + (d.fours || 0), 0),
    totalSixes: data.reduce((sum, d) => sum + (d.sixes || 0), 0),
  };

  const avgStrikeRate =
    stats.totalBalls > 0
      ? ((stats.totalRuns / stats.totalBalls) * 100).toFixed(2)
      : 0;





    const playerName = data[0]?.playerId?.playername || "Player";
  return (
    <div className="player-history-page">
      {/* Back Button */}
      <button
        className="player-history-back"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Title */}
      <h2 className="player-history-title">
        <span></span> {playerName} - Carrear
      </h2>

      {/* Stats Cards */}
      {!loading && data.length > 0 && (
        <div className="player-history-stats">
          <div className="player-history-stat-card">
            <div className="player-history-stat-label">Matches</div>
            <div className="player-history-stat-value">{stats.totalMatches}</div>
          </div>
          <div className="player-history-stat-card">
            <div className="player-history-stat-label">Total Runs</div>
            <div className="player-history-stat-value">{stats.totalRuns}</div>
          </div>
          <div className="player-history-stat-card">
            <div className="player-history-stat-label">Strike Rate</div>
            <div className="player-history-stat-value">{avgStrikeRate}%</div>
          </div>
          <div className="player-history-stat-card">
            <div className="player-history-stat-label">Wickets</div>
            <div className="player-history-stat-value">{stats.totalWickets}</div>
          </div>
          <div className="player-history-stat-card">
            <div className="player-history-stat-label">4s</div>
            <div className="player-history-stat-value">{stats.totalFours}</div>
          </div>
          <div className="player-history-stat-card">
            <div className="player-history-stat-label">6s</div>
            <div className="player-history-stat-value">{stats.totalSixes}</div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="player-history-loading">
          <div className="player-history-spinner"></div>
          Loading history...
        </div>
      ) : data.length === 0 ? (
        <div className="player-history-container">
          <div className="player-history-empty">
            <div className="player-history-empty-icon">📭</div>
            <p>No match history found</p>
          </div>
        </div>
      ) : (
        <div className="player-history-container">
          <table className="player-history-table">
            <thead>
              <tr>
                <th>Match Date</th>
                <th>Vanue</th>
                <th>Runs</th>
                <th>Balls</th>
                <th>4s</th>
                <th>6s</th>
                <th>Wickets</th>
              </tr>
            </thead>

            <tbody>
              {data.map((d) => (
                <tr key={d._id}>
                  <td className="player-history-match-date">
                    {new Date(d.matchId?.matchDate).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td>{d.matchId?.venue}</td>

                  <td
                    className={`player-history-runs ${
                      d.battingRuns === 0
                        ? "player-history-zero"
                        : ""
                    }`}
                  >
                    {d.battingRuns ?? "—"}
                  </td>
                  
                  <td className="player-history-balls">
                    {d.battingBalls ?? "—"}
                  </td>
                  <td
                    className={`player-history-fours ${
                      d.fours === 0 ? "player-history-zero" : ""
                    }`}
                  >
                    {d.fours ?? "—"}
                  </td>
                  <td
                    className={`player-history-sixes ${
                      d.sixes === 0 ? "player-history-zero" : ""
                    }`}
                  >
                    {d.sixes ?? "—"}
                  </td>
                  <td
                    className={`player-history-wickets ${
                      d.wickets === 0 ? "player-history-zero" : ""
                    }`}
                  >
                    {d.wickets ?? "—"}
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

export default PlayerHistory;