import { IconInfoCircleFilled } from "@tabler/icons-react";
import styled from "styled-components";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

const InfoContainer = styled.div`
  color: #ea580c;
  cursor: pointer;
  position: fixed;
  top: 20px;
  left: 20px;
  scale: 130%;

  &:hover {
    transform: scale(105%);
  }
  @media (min-width: 640px) {
    top: 50px;
    left: 50px;
    scale: 100%;
  }
`;

const InfoPopover = styled.div`
  padding: 12px;
  font-size: medium;
  line-height: 200%;
  @media (min-width: 640px) {
    font-size: large;
  }
`;

export default function InfoPopup() {
  return (
    <InfoContainer>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <IconInfoCircleFilled className="icon" role="button" />
        </PopoverTrigger>
        <PopoverContent className="grey-bg white rounded">
          <InfoPopover>
            <li>Magnificence = Goals + Assists</li>
            <li>
              In the event of a tie, players with more goals are displayed
            </li>
            <li>
              The formation is fixed to 1 goalkeeper - 2 defenders - 3
              midfielders - 1 forward
            </li>
            <li>Tap the player cards to show goal and assist totals</li>
            <li>
              The most magnificent player is highlighted with a star and orange
              border
            </li>
          </InfoPopover>
        </PopoverContent>
      </Popover>
    </InfoContainer>
  );
}
