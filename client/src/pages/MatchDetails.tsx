import "./styles/MatchDetails.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";


const URL = import.meta.env.VITE_API_URL;

const MatchDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { matchId } = useParams();

  const [scorecard, setScorecard] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const fetchScorecard = async () => {
    const res = await fetch(`${URL}/api/player/history/match/${matchId}`);
    const data = await res.json();
    setScorecard(data);
  };

  useEffect(() => {
    if (matchId) fetchScorecard();
  }, [matchId]);

  const getStats = (playerId: string) => {
    return scorecard.find((p: any) => p.playerId?._id === playerId);
  };

  if (!state)
    return (
      <div className="details-error">
        <p>No match data found.</p>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>
    );

  const match = state;

  // Determine which team's players to show
  const teamsData = [
    { label: match.teamA.teamname, id: match.teamA._id, players: match.playingTeamA },
    { label: match.teamB.teamname, id: match.teamB._id, players: match.playingTeamB },
  ];

  // Filter based on selected team
  const displayTeams = selectedTeam
    ? teamsData.filter((t) => t.id === selectedTeam)
    : teamsData;

  return (
    <div className="details-page">

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Title Block */}
      <div className="details-title-block">
        <h2 className="details-title">
          {match.teamA.teamname}
          <span className="details-vs">vs</span>
          {match.teamB.teamname}
        </h2>
        <div className="details-meta">
          {match.matchType && (
            <span className="badge badge--type">
              {match.matchType.toUpperCase()}
            </span>
          )}
          <span className={`badge badge--${match.status}`}>
            {match.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Info Card */}
      <div className="details-card">
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Toss Winner</span>
            <span className="info-value">
              {match.tossWinner?.teamname ?? "—"}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Match Winner</span>
            <span
              className={`info-value ${match.winner ? "info-value--winner" : ""}`}
            >
              {match.winner?.teamname ?? "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Score Summary Cards */}
      {(match.teamAScore || match.teamBScore) && (
        <div className="scores-row">
          {[
            { team: match.teamA, score: match.teamAScore },
            { team: match.teamB, score: match.teamBScore },
          ].map(
            ({ team, score }) =>
              score && (
                <div
                  key={team._id}
                  className={`score-card ${
                    match.winner?._id === team._id ? "score-card--winner" : ""
                  }`}
                >
                  {match.winner?._id === team._id && (
                    <span className="score-card__winner-tag">Winner</span>
                  )}
                  <p className="score-card__team">{team.teamname}</p>
                  <p className="score-card__runs">
                    {score.runs}
                    <span className="score-card__wickets">/{score.wickets}</span>
                  </p>
                  <p className="score-card__overs">{score.overs} overs</p>
                </div>
              )
          )}
        </div>
      )}

      {/* ─── Innings Details ─── */}
      {match.innings?.length > 0 && (
        <div className="innings-section">
          <h3 className="section-title">🏏 Innings</h3>

          <div className="innings-cards-grid">
            {match.innings.map((inn: any) => (
              <div key={inn._id} className="innings-card">

                {/* Innings Header */}
                <div className="innings-header">
                  <span className="innings-label">
                    <strong>Innings {inn.inningNumber}</strong>
                    <span className="innings-label-sub">{inn.battingTeam.teamname}</span>
                  </span>
                  <span className={`badge badge--status badge--${inn.status}`}>
                    {inn.status.toUpperCase()}
                  </span>
                </div>

                {/* Score */}
                <div className="innings-score-row">
                  <span className="innings-runs">
                    {inn.totalRuns}
                    <span className="innings-wickets">/{inn.totalWickets}</span>
                  </span>
                  <span className="innings-overs">
                    ({inn.oversCompleted}.{inn.ballsInCurrentOver} ov)
                  </span>
                </div>

                {/* Extras */}
                {inn.extras > 0 && (
                  <div className="innings-extras">
                    Extras: {inn.extras}
                  </div>
                )}

                {/* Target */}
                {inn.target !== undefined && (
                  <div className="innings-target">
                    🎯 Target: {inn.target}
                    {inn.status === "ongoing" && (
                      <span className="innings-target__need">
                        &nbsp;• Need {inn.target - inn.totalRuns} more run
                        {inn.target - inn.totalRuns !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Live Players Section (below cards if needed) */}
          {match.innings?.some((inn: any) => inn.status === "ongoing") && (
            <div className="innings-live-info">
              <p className="innings-live-title">🔴 Live</p>
              <div className="live-players-grid">
                {match.innings.map((inn: any) =>
                  inn.status === "ongoing" && (
                    <div key={`${inn._id}-live`}>
                      {inn.striker && (
                        <div className="live-player">
                          <span className="live-player__icon">🏏</span>
                          <span className="live-player__name">
                            {inn.striker.playername}
                          </span>
                          <span className="live-player__role">striker</span>
                        </div>
                      )}
                      {inn.nonStriker && (
                        <div className="live-player">
                          <span className="live-player__icon">🏏</span>
                          <span className="live-player__name">
                            {inn.nonStriker.playername}
                          </span>
                          <span className="live-player__role">
                            non-striker
                          </span>
                        </div>
                      )}
                      {inn.currentBowler && (
                        <div className="live-player">
                          <span className="live-player__icon">🎯</span>
                          <span className="live-player__name">
                            {inn.currentBowler.playername}
                          </span>
                          <span className="live-player__role">bowling</span>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Team Filter Tabs */}
      <div className="team-filter-tabs">
        {teamsData.map(({ label, id }) => (
          <button
            key={id}
            className={`filter-tab ${selectedTeam === id ? "filter-tab--active" : ""}`}
            onClick={() => setSelectedTeam(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Players Grid */}
      <div className="players-grid">
        {displayTeams.map(({ label, players }) => (
          <div key={label} className="details-card">
            <h3 className="section-title">{label.toUpperCase()}</h3>
            <div className="section-divider" />

            {players?.length ? (
              players.map((p: any, i: number) => {
                const stats = getStats(p._id);

                const runs = stats?.battingRuns || 0;
                const balls = stats?.battingBalls || 0;

                const strikeRate =
                  balls > 0 ? ((runs / balls) * 100).toFixed(1) : "0.0";

                const bowlerBalls = stats?.bowlingBalls || 0;
                const overs = `${Math.floor(bowlerBalls / 6)}.${bowlerBalls % 6}`;
                const wickets = stats?.wickets || 0;
                const runsGiven = stats?.runsConceded || 0;

                return (
                  <div key={p._id} className="player-row">

                    <span className="player-row__num">{i + 1}</span>

                    <span className="player-row__name"
                      onClick={() => navigate(`/player-history/${p._id}`)}
                    >
                      {p.playername}
                    </span>

                    {/* 🟢 BATTING */}
                    <span className="player-batting">
                      {runs} ({balls}) | SR: {strikeRate}
                    </span>

                    {/* 🔵 BOWLING */}
                    <span className="player-bowling">
                      {overs} ov | {runsGiven} R | {wickets} W
                    </span>

                  </div>
                );
              })
            ) : (
              <p className="players-empty">No players</p>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default MatchDetails;