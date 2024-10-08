"use client"; // styled-components requires client side rendering

import styled from "styled-components";
import { useState } from "react";
import PlayerCard from "./components/PlayerCard";
import Info from "./components/InfoPopup";

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

// styling for each styled-components element
const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  place-content: center;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
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

  &:hover {
    scale: 102%;
    transition: ease-in-out;
    transition-duration: 0.1s;
    background-color: #ea580c;
    color: white;
  }
`;

const PlayerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 90vh;
  justify-content: space-around;
`;

const PlayerRow = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default function Home() {
  // Holds player data, team data, as well as boolean logic to indicate data has been loaded
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [teamData, setTeamData] = useState<Team[]>([]);
  const [loaded, setLoaded] = useState(false);
  // Default button text
  const [buttonText, setButtonText] = useState(
    "Reveal the stars of the season!"
  );

  // Function to sort players by goals + assists. If tied, the player with more goals wins
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

  // Fetch function triggered by button press
  const fetchTeamsData = () => {
    // Sets button text to Loading
    setButtonText("Loading...");

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
        const sortedPlayerData = sortPlayersByGoalsAndAssists(data.elements); // Sort players by goals and assists

        setPlayerData(sortedPlayerData); // Store the sorted player data
        setTeamData(data.teams); // Store team data
        setLoaded(true); // Indicate that data is loaded
      })
      .catch((error) => {
        console.error("There was an issue with the fetch:", error);
        setButtonText("Reveal the stars of the season!"); // Reset button text on error
      });
  };

  // Calculate the player with the highest magnificence
  const maxMagnificence = Math.max(
    ...playerData.map((player) => player.goals_scored + player.assists)
  );
  return (
    <Wrapper>
      <MainContainer>
        <Info />
        {!loaded ? (
          // Shows welcome section if player data not loaded
          <WelcomeSection>
            <Title>Welcome to FPL's Magnificent Seven </Title>

            <LoadPlayersButton
              onClick={fetchTeamsData}
              disabled={buttonText === "Loading..."}
            >
              {buttonText}
            </LoadPlayersButton>
          </WelcomeSection>
        ) : (
          // Player section loaded after button is clicked
          <PlayerSection>
            <>
              {/* Row for Goalkeeper */}
              <PlayerRow className="one-player">
                {playerData
                  .filter((player) => player.element_type === 1) // Filter on element type of 1 (goalkeepers)
                  .slice(0, 1) // Limit to 1 player
                  .map((player) => (
                    <PlayerCard
                      key={player.code}
                      player={player}
                      teamData={teamData}
                      highestMagnificence={
                        player.goals_scored + player.assists === maxMagnificence
                      }
                    />
                  ))}
              </PlayerRow>

              {/* Row for Defenders */}
              <PlayerRow className="two-players">
                {playerData
                  .filter((player) => player.element_type === 2) // Filter on element type of 2 (defenders)
                  .slice(0, 2) // Limit to 2 players
                  .map((player) => (
                    <PlayerCard
                      key={player.code}
                      player={player}
                      teamData={teamData}
                      highestMagnificence={
                        player.goals_scored + player.assists === maxMagnificence
                      }
                    />
                  ))}
              </PlayerRow>

              {/* Row for Midfielders */}
              <PlayerRow className="three-players">
                {playerData
                  .filter((player) => player.element_type === 3) // Filter on element type of 3 (midfielders)
                  .slice(0, 3) // Limit to 3 players
                  .map((player) => (
                    <PlayerCard
                      key={player.code}
                      player={player}
                      teamData={teamData}
                      highestMagnificence={
                        player.goals_scored + player.assists === maxMagnificence
                      }
                    />
                  ))}
              </PlayerRow>

              {/* Row for Forward */}
              <PlayerRow className="one-player">
                {playerData
                  .filter((player) => player.element_type === 4) // Filter on element type of 4 (forward)
                  .slice(0, 1) // Limit to 1 player
                  .map((player) => (
                    <PlayerCard
                      key={player.code}
                      player={player}
                      teamData={teamData}
                      highestMagnificence={
                        player.goals_scored + player.assists === maxMagnificence
                      }
                    />
                  ))}
              </PlayerRow>
            </>
          </PlayerSection>
        )}
      </MainContainer>
    </Wrapper>
  );
}
