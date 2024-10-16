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
  isHighestMagnificence: boolean;
}

const CardContainer = styled.section`
  position: relative;
  width: 100px;
  height: 130px;
  cursor: pointer;
  border-radius: 0.75rem;
  margin: 0 0.25rem;
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

const MotionCard = styled(motion.div)`
  border-radius: 1rem;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d; /* Safari compatibility */
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden; /* Safari compatibility */
`;

const CardBack = styled.div`
  transform: rotateX(180deg);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden; /* Safari compatibility */
  @media (min-width: 640px) {
    width: 150px;
    height: 170px;
  }
  @media (min-width: 768px) {
    width: 190px;
    height: 190px;
  }
`;

const CardFooterFront = styled(CardFooter)`
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden; /* Safari compatibility */
  padding-left: 0;
  padding-right: 0;
  z-index: 10;
  transform: translateY(-0.7rem);
  text-align: center;
  width: 100%;
  justify-content: center;
  background-color: #ea580c;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  @media (min-width: 640px) {
    height: 170px;
    transform: translateY(-0);
  }
  @media (min-width: 768px) {
    transform: translateY(-0.75rem);
  }
`;

const CardFooterBack = styled(CardFooter)`
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden; /* Safari compatibility */
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 130px;
`;

export default function PlayerCard({
  player,
  teamData,
  isHighestMagnificence,
}: PlayerCardProps) {
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>(
    {}
  );

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
      <MotionCard
        animate={{ rotateX: flippedCards[player.code] ? 180 : 0 }}
        whileHover={{ boxShadow: "0 0 10px 3px gold" }}
        transition={{ duration: 0.3 }}
      >
        {/* Front side */}
        <CardFront>
          <Card
            className={`card rounded white-bg ${
              isHighestMagnificence ? "highest-magnificence" : ""
            }`}
          >
            <CardHeader className="card-header">
              <p className="player-name center">{player.web_name}</p>
              <div className="team-and-position">
                <p className="position">{getPosition(player.element_type)}</p>{" "}
                <p>{getTeamName(player.team_code)}</p>
              </div>
            </CardHeader>
            {isHighestMagnificence && (
              <IconStarFilled size={25} color="gold" id="star-icon" />
            )}
            <Image
              className="player-image"
              alt={player.web_name}
              width="auto"
              draggable="false"
              // fetches relevant player image using player code
              src={
                "https://resources.premierleague.com/premierleague/photos/players/110x140/p" +
                player.code +
                ".png"
              }
            />
            <CardFooterFront className="rounded">
              <p>
                <span className="magnificence white">
                  {player.goals_scored + player.assists} Magnificence
                </span>
              </p>
            </CardFooterFront>
          </Card>
        </CardFront>

        {/* Back side */}
        <CardBack>
          <Card
            className={`card card-back rounded white grey-bg ${
              isHighestMagnificence ? "highest-magnificence-back-face " : ""
            }"`}
          >
            <CardFooterBack>
              <p>
                <IconBallFootball className="center white icon" />
                {player.goals_scored} Goals
              </p>
              <p>
                <IconSoccerField className="center white icon" />
                {player.assists} Assists
              </p>
            </CardFooterBack>
          </Card>
        </CardBack>
      </MotionCard>
    </CardContainer>
  );
}
