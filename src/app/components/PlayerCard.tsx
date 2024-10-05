import { Card, CardFooter, Image, CardHeader } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { IconBallFootball, IconSoccerField } from "@tabler/icons-react";

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
  isMagnificent: boolean;
}

export default function PlayerCard({
  player,
  teamData,
  isMagnificent,
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
      className="relative w-[120px] h-[150px] sm:w-[150px] sm:h-[170px] md:w-[200px] md:h-[200px] cursor-pointer rounded-xl hover:scale-105 transition ease-linear mx-1"
      onClick={() => handleCardClick(player.code)}
    >
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotateX: flippedCards[player.code] ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className={`absolute w-full rounded-xl h-full backface-hidden ${
            isMagnificent ? "shadow-xl shadow-amber-400" : ""
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <Card className="flex flex-col h-full items-center bg-white shadow-2xl rounded-xl">
            <CardHeader className="flex flex-col w-full px-2 font-bold">
              <p className="uppercase text-sm sm:text-base">
                {player.web_name}
              </p>
              <div className="text-xs w-full sm:justify-between sm:flex flex-col sm:flex-row">
                <p className="px-1 rounded-md text-lightblue bg-darkblue rounded-t-none w-fit">
                  {getPosition(player.element_type)}
                </p>{" "}
                <p>{getTeamName(player.team_code)}</p>
              </div>
            </CardHeader>
            <Image
              className="object-cover h-[80px] sm:h-[120px] md:h-[150px]"
              alt={player.web_name}
              width="auto"
              src={
                "https://resources.premierleague.com/premierleague/photos/players/110x140/p" +
                player.code +
                ".png"
              }
            />
            <CardFooter className="px-0 z-10 -translate-y-1 md:-translate-y-3 text-center w-full justify-center bg-orange-600 rounded-xl rounded-t-none">
              <p className="text-black ">
                <span className="text-white text-xs md:text-base font-bold">
                  {player.goals_scored + player.assists} Magnificence
                </span>
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Back Side */}
        <div
          className="relative w-[120px] h-[150px] sm:w-[150px] sm:h-[170px] md:w-[200px] md:h-[200px] rounded-md backface-hidden"
          style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}
        >
          <Card
            className={`h-full w-full bg-gray-800 text-white shadow-2xl rounded-xl flex flex-col justify-center my-auto ${
              isMagnificent ? "bg-amber-400 " : ""
            }"`}
          >
            <CardFooter className="px-2 text-center flex flex-col place-content-center items-center justify-center">
              <p>
                <IconBallFootball className="mx-auto text-white" size={40} />
                {player.goals_scored} Goals
              </p>

              <p>
                <IconSoccerField className="mx-auto text-white" size={40} />
                {player.assists} Assists
              </p>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
