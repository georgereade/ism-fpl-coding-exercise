import { useState } from "react";
import styled from "styled-components";
import PlayerCard from "./PlayerCard";

interface Player {
  web_name: string;
  goals_scored: number;
  assists: number;
  code: number;
  element_type: number;
  team_code: number;
}

interface Team {
  code: number;
  name: string;
}

const LoadPlayersButton = styled.button`
  border-radius: 4px;
  cursor: pointer;
  font-size: larger;
  padding: 4px;
  background-color: white;

  &:hover {
    scale: 105%;
    transition: ease-in-out;
    transition-duration: 0.1s;
  }
`;

export default function Data() {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [teamData, setTeamData] = useState<Team[]>([]);
  const [loaded, setLoaded] = useState(false);

  const fetchTeamsData = () => {
    fetch("https://cors-proxy-90954623675.europe-west1.run.app/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPlayerData(data.elements);
        setTeamData(data.teams);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("There was an issue with the fetch:", error);
      });
  };

  // Helper function to sort players by goals + assists
  const sortPlayersByGoalsAndAssists = (players: Player[]) => {
    return players.sort(
      (a, b) => b.goals_scored + b.assists - (a.goals_scored + a.assists)
    );
  };

  // Filter and sort player data by position type
  const goalkeepers = sortPlayersByGoalsAndAssists(
    playerData.filter((player) => player.element_type === 1)
  );
  const defenders = sortPlayersByGoalsAndAssists(
    playerData.filter((player) => player.element_type === 2)
  );
  const midfielders = sortPlayersByGoalsAndAssists(
    playerData.filter((player) => player.element_type === 3)
  );
  const forwards = sortPlayersByGoalsAndAssists(
    playerData.filter((player) => player.element_type === 4)
  );

  return (
    <div>
      {!loaded ? (
        <LoadPlayersButton onClick={fetchTeamsData}>
          Click to reveal the stars of the season so far!
        </LoadPlayersButton>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Row for Goalkeepers (limit 1) */}
          <div className="flex flex-wrap justify-center">
            {goalkeepers.slice(0, 1).map((player) => (
              <PlayerCard
                key={player.code}
                player={player}
                teamData={teamData}
              />
            ))}
          </div>

          {/* Row for Defenders (limit 2) */}
          <div className="flex flex-wrap justify-center gap-4">
            {defenders.slice(0, 2).map((player) => (
              <PlayerCard
                key={player.code}
                player={player}
                teamData={teamData}
              />
            ))}
          </div>

          {/* Row for Midfielders (limit 3) */}
          <div className="flex flex-wrap justify-center gap-4">
            {midfielders.slice(0, 3).map((player) => (
              <PlayerCard
                key={player.code}
                player={player}
                teamData={teamData}
              />
            ))}
          </div>

          {/* Row for Forwards (limit 1) */}
          <div className="flex flex-wrap justify-center gap-4">
            {forwards.slice(0, 1).map((player) => (
              <PlayerCard
                key={player.code}
                player={player}
                teamData={teamData}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
