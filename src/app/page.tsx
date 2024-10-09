"use client"; // styled-components requires client side rendering

import styled from "styled-components";
import { useState, useCallback } from "react";
import PlayerCard from "./components/PlayerCard";
import Info from "./components/InfoPopup";
import { SpinningCircles } from "react-loading-icons";

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

const AppContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  min-height: 100vh;
  @media (min-width: 640px) {
    width: 85%;
  }
`;

const WelcomeSection = styled.section`
  display: flex;
  place-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.5em;
  padding: 4px 0px 8px 0px;
  width: fit-content;
  text-align: center;
  background-color: white;
  margin: auto;
  background-color: transparent;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  backdrop-filter: blur(40px);
  text-decoration: underline;
  text-underline-offset: 5px;
`;

const LoadPlayersButton = styled.button`
  border-radius: 4px;
  cursor: pointer;
  font-size: larger;
  padding: 8px;
  background-color: white;
  margin: auto;
  margin-top: 10px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(102%);
    transition: ease-in-out;
    transition-duration: 0.1s;
    background-color: #ea580c;
    color: white;
  }
`;

const PlayerSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 70%;
  justify-content: space-around;
  width: 100%;
`;

const PlayerRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export default function Home() {
  // Holds player data, team data, as well as boolean logic to indicate data has been loaded
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [teamData, setTeamData] = useState<Team[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sortPlayersByGoalsAndAssists = (players: Player[]) => {
    return players.sort((a, b) => {
      const aTotal = a.goals_scored + a.assists;
      const bTotal = b.goals_scored + b.assists;

      // Compare by total goals + assists
      if (bTotal !== aTotal) {
        return bTotal - aTotal;
      }

      // If tied, compare by goals scored
      return b.goals_scored - a.goals_scored;
    });
  };

  const fetchTeamsData = useCallback(() => {
    // Sets button text to indicate loading
    setIsLoading(true);

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
        const sortedPlayerData = sortPlayersByGoalsAndAssists(data.elements);

        setPlayerData(sortedPlayerData); // Store the sorted player data
        setTeamData(data.teams); // Store team data
        setLoaded(true); // Indicate that data is loaded to trigger player cards
      })
      .catch((error) => {
        console.error("There was an issue with the fetch:", error);
        setIsLoading(false);
      });
  }, []);

  // Calculate the player with the highest magnificence
  const maxMagnificence = Math.max(
    ...playerData.map((player) => player.goals_scored + player.assists)
  );

  const playerRowsConfig = [
    { elementType: 1, limit: 1 }, // Goalkeepers
    { elementType: 2, limit: 2 }, // Defenders
    { elementType: 3, limit: 3 }, // Midfielders
    { elementType: 4, limit: 1 }, // Forwards
  ];

  return (
    <AppContainer>
      <Info />
      {!loaded ? (
        // Shows welcome section until data loaded
        <WelcomeSection>
          <Title>Welcome to FPL&apos;s Magnificent Seven</Title>

          <LoadPlayersButton onClick={fetchTeamsData} disabled={isLoading}>
            {isLoading ? (
              <SpinningCircles
                stroke="#ea580c"
                fill="#1f2937"
                width="30"
                height="30"
              />
            ) : (
              "REVEAL TEAM"
            )}
          </LoadPlayersButton>
        </WelcomeSection>
      ) : (
        <PlayerSection>
          {playerRowsConfig.map(({ elementType, limit }) => (
            <PlayerRow key={elementType}>
              {playerData
                .filter((player) => player.element_type === elementType) // Filter on player position
                .slice(0, limit) // Limit to correct number per position
                .map((player) => (
                  <PlayerCard
                    key={player.code}
                    player={player}
                    teamData={teamData}
                    isHighestMagnificence={
                      player.goals_scored + player.assists === maxMagnificence
                    }
                  />
                ))}
            </PlayerRow>
          ))}
        </PlayerSection>
      )}
    </AppContainer>
  );
}
