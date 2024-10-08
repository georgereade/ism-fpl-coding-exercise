import { IconInfoCircleFilled } from "@tabler/icons-react";
import styled from "styled-components";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

const InfoContainer = styled.div`
  color: #ea580c;
  cursor: pointer;
  position: fixed;
  top: 30px;
  left: 20px;

  &:hover {
    scale: 105%;
  }
  @media (min-width: 768px) {
    top: 50px;
    left: 50px;
  }
`;

const InfoPopover = styled.div`
  padding: 12px;
  font-size: small;
  line-height: 200%;
  @media (min-width: 768px) {
    font-size: medium;
  }
`;

export default function InfoPopup() {
  return (
    <InfoContainer>
      <Popover placement="right-start">
        {/* Loads popover info when icon is clicked */}
        <PopoverTrigger>
          <IconInfoCircleFilled className="icon" role="button" />
        </PopoverTrigger>
        <PopoverContent className="grey-bg white rounded">
          <InfoPopover>
            <li>
              Magnificence is determined by calculating combined goals and
              assists
            </li>
            <li>
              In the event of a tie, players with more goals are prioritised
              over assists
            </li>
            <li>
              The formation is fixed to one goalkeeper, two defenders, three
              midfielders and one forward
            </li>
            <li>Tap the player card to show goal and assist totals</li>
          </InfoPopover>
        </PopoverContent>
      </Popover>
    </InfoContainer>
  );
}
