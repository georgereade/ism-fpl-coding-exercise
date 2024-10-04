import { Card, CardFooter, Image, CardHeader } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";

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
}

export default function PlayerCard({ player, teamData }: PlayerCardProps) {
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleCardClick = (playerCode: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [playerCode]: !prev[playerCode],
    }));
  };

  const getPosition = (elementType: number) => {
    const positions: { [key: number]: string } = {
      1: "Goalkeeper",
      2: "Defender",
      3: "Midfielder",
      4: "Forward",
    };
    return positions[elementType] || "Unknown";
  };

  const getTeamName = (teamCode: number) => {
    const team = teamData.find((team) => team.code === teamCode);
    return team ? team.name : "Unknown Team";
  };

  return (
    <div
      className="relative w-[200px] h-[150px] cursor-pointer rounded-xl hover:scale-105 transition ease-linear"
      onClick={() => handleCardClick(player.code)}
    >
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotateY: flippedCards[player.code] ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full rounded-xl h-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Card className="flex flex-col h-full items-center bg-white shadow-2xl rounded-xl">
            <CardHeader className="flex flex-col w-full px-2 font-bold">
              <p className="uppercase">{player.web_name}</p>
              <p className="text-xs">
                <span className="px-1 rounded-md text-lightblue bg-darkblue rounded-t-none">
                  {getPosition(player.element_type)}
                </span>{" "}
                {getTeamName(player.team_code)}
              </p>
            </CardHeader>
            <Image
              className="object-cover"
              alt={player.web_name}
              width="auto"
              height={100}
              src={
                "https://resources.premierleague.com/premierleague/photos/players/110x140/p" +
                player.code +
                ".png"
              }
            />
            <CardFooter className="px-2 text-center w-full justify-center">
              <p className="text-black -translate-y-4 z-10">
                <span className="text-orange-600 font-bold bg-white ">
                  Magnificance: {player.goals_scored + player.assists}
                </span>
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Back Side */}
        <div
          className="absolute h-full w-full rounded-md backface-hidden"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <Card className="flex flex-col h-full items-center bg-gray-800 text-white shadow-2xl rounded-xl">
            <CardFooter className="px-2 text-center flex flex-col place-content-center items-center justify-center">
              <p>Goals: {player.goals_scored}</p>
              <p>Assists: {player.assists}</p>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
