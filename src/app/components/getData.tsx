import { useState } from "react";
import styled from "styled-components";
import PlayerCard from "./PlayerCard";

// Instructs typescript on what types to expect for the Player and Team objects
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

const Title = styled.h1`
  font-size: 1.5em;
  padding: 4px 0px 8px 0px;
  margin-bottom: 8px;
  width: fit-content;
  text-align: center;
  background-color: white;
`;

export default function Data() {
  // Holds player and team data, as well as boolean logic to indicate data has been loaded
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [teamData, setTeamData] = useState<Team[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Function to sort players by goals + assists. If tied, the player with more goals wins
  const sortPlayersByGoalsAndAssists = (players: Player[]) => {
    return players.sort((a, b) => {
      const aTotal = a.goals_scored + a.assists;
      const bTotal = b.goals_scored + b.assists;

      // First compare by total goals + assists
      if (bTotal !== aTotal) {
        return bTotal - aTotal;
      }

      // If tied, compare by goals scored
      return b.goals_scored - a.goals_scored;
    });
  };

  // Fetch function triggered by button press
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
        // Sort players by goals and assists
        const sortedPlayerData = sortPlayersByGoalsAndAssists(data.elements);

        setPlayerData(sortedPlayerData); // Stored the sorted players
        setTeamData(data.teams); // Store the team data
        setLoaded(true); // Indicate that data is loaded
      })
      .catch((error) => {
        console.error("There was an issue with the fetch:", error);
      });
  };

  // Calculate the maximum magnificence
  const maxMagnificence = Math.max(
    ...playerData.map((player) => player.goals_scored + player.assists)
  );

  return (
    <div>
      {!loaded ? (
        <div>
          <Title>Welcome to FPL's Magnificent Seven</Title>
          <LoadPlayersButton onClick={fetchTeamsData}>
            Click to reveal the stars of the season so far!
          </LoadPlayersButton>
        </div>
      ) : (
        <div className="flex flex-col w-screen gap-4">
          {playerData.length > 0 && (
            <>
              {/* Row for Goalkeepers (limit 1) */}
              <div className="flex justify-center">
                {playerData
                  .filter((player) => player.element_type === 1)
                  .slice(0, 1)
                  .map((player) => (
                    <PlayerCard
                      key={player.code}
                      player={player}
                      teamData={teamData}
                      isMagnificent={
                        player.goals_scored + player.assists === maxMagnificence
                      }
                    />
                  ))}
              </div>

              {/* Row for Defenders (limit 2) */}
              <div className="flex justify-around gap-2">
                {playerData
                  .filter((player) => player.element_type === 2)
                  .slice(0, 2)
                  .map((player) => (
                    <PlayerCard
                      key={player.code}
                      player={player}
                      teamData={teamData}
                      isMagnificent={
                        player.goals_scored + player.assists === maxMagnificence
                      }
                    />
                  ))}
              </div>

              {/* Row for Midfielders (limit 3) */}
              <div className="flex justify-around gap-2">
                {playerData
                  .filter((player) => player.element_type === 3)
                  .slice(0, 3)
                  .map((player) => (
                    <PlayerCard
                      key={player.code}
                      player={player}
                      teamData={teamData}
                      isMagnificent={
                        player.goals_scored + player.assists === maxMagnificence
                      }
                    />
                  ))}
              </div>

              {/* Row for Forwards (limit 1) */}
              <div className="flex justify-center gap-2">
                {playerData
                  .filter((player) => player.element_type === 4)
                  .slice(0, 1)
                  .map((player) => (
                    <PlayerCard
                      key={player.code}
                      player={player}
                      teamData={teamData}
                      isMagnificent={
                        player.goals_scored + player.assists === maxMagnificence
                      }
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
