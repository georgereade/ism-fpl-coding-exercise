"use client";

import styled from "styled-components";
import Data from "./components/getData";

const Title = styled.h1`
  font-size: 1.5em;
  padding: 4px 0px 8px 0px;
`;

const Subheader = styled.h2`
  font-size: 1em;
`;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  margin: auto;
  background-image: url("/pitch.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-size: contain;

  @media (max-width: 600px) {
    background-size: cover;
  }
`;

export default function Home() {
  return (
    <Wrapper>
      <Title>Welcome to FPL's Magnificent Seven</Title>
      <Data />
    </Wrapper>
  );
}
