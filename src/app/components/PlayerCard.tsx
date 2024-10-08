import { Card, CardFooter, Image, CardHeader } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import {
  IconBallFootball,
  IconSoccerField,
  IconStarFilled,
} from "@tabler/icons-react";

// Type assignments for player card data
interface PlayerCardProps {
  player: {
    web_name: string;
    goals_scored: number;
    assists: number;
    code: number;
    element_type: number;
    team_code: number;
  };
  teamData: { code: number; name: string }[];
  highestMagnificence: boolean;
}

const CardContainer = styled.h1`
  position: relative;
  width: 100px;
  height: 130px;
  cursor: pointer;
  border-radius: 0.75rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  user-select: none;
  @media (min-width: 640px) {
    width: 150px;
    height: 170px;
  }
  @media (min-width: 768px) {
    width: 190px;
    height: 190px;
  }
`;

const CardFront = styled.h1`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const CardBack = styled.h1`
  transform: rotateX(180deg);
  backface-visibility: hidden;
  @media (min-width: 640px) {
    width: 150px;
    height: 170px;
  }
  @media (min-width: 768px) {
    width: 190px;
    height: 190px;
  }
`;

export default function PlayerCard({
  player,
  teamData,
  highestMagnificence,
}: PlayerCardProps) {
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Identify which card has been clicked and handle click
  const handleCardClick = (playerCode: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [playerCode]: !prev[playerCode],
    }));
  };

  // Convert elementType code to position name
  const getPosition = (elementType: number) => {
    const positions: { [key: number]: string } = {
      1: "Goalkeeper",
      2: "Defender",
      3: "Midfielder",
      4: "Forward",
    };
    return positions[elementType] || "Unknown";
  };

  // Convert teamCode to team name
  const getTeamName = (teamCode: number) => {
    const team = teamData.find((team) => team.code === teamCode);
    return team ? team.name : "Unknown Team";
  };

  return (
    <CardContainer
      onClick={() => handleCardClick(player.code)} // Passes player code on click
    >
      {/* Framer motion element to handle flip animation */}
      <motion.div
        animate={{ rotateX: flippedCards[player.code] ? 180 : 0 }}
        whileHover={{ boxShadow: "0 0 10px 3px gold" }}
        transition={{ duration: 0.3 }}
        style={{ borderRadius: "1rem", transformStyle: "preserve-3d" }}
      >
        {/* Front side */}
        <CardFront>
          <Card
            className={`card rounded white-bg ${
              highestMagnificence ? "highest-magnificence" : ""
            }`}
          >
            <CardHeader className="card-header">
              <p className="player-name center">{player.web_name}</p>
              <div className="team-and-position">
                <p className="position">{getPosition(player.element_type)}</p>{" "}
                <p>{getTeamName(player.team_code)}</p>
              </div>
            </CardHeader>
            {highestMagnificence && (
              <IconStarFilled
                size={25}
                color="gold"
                style={{
                  marginLeft: "0.5rem",
                  position: "fixed",
                  top: "30%",
                  right: "10%",
                }}
              />
            )}
            <Image
              className="player-image"
              alt={player.web_name}
              width="auto"
              draggable="false"
              // fetches relevant player image with player code
              src={
                "https://resources.premierleague.com/premierleague/photos/players/110x140/p" +
                player.code +
                ".png"
              }
            />
            <CardFooter className="card-footer rounded">
              <p>
                <span className="magnificence white">
                  {player.goals_scored + player.assists} Magnificence
                </span>
              </p>
            </CardFooter>
          </Card>
        </CardFront>

        {/* Back side */}
        <CardBack>
          <Card
            className={`card card-back rounded white grey-bg ${
              highestMagnificence ? "highest-magnificence-back-face " : ""
            }"`}
          >
            <CardFooter className="card-footer-back">
              <p>
                <IconBallFootball className="center white icon" />
                {player.goals_scored} Goals
              </p>

              <p>
                <IconSoccerField className="center white icon" />
                {player.assists} Assists
              </p>
            </CardFooter>
          </Card>
        </CardBack>
      </motion.div>
    </CardContainer>
  );
}
