"use client";

import styled from "styled-components";
import Data from "./components/getData";

const Title = styled.h1`
  font-size: 1.5em;
  padding: 4px 0px 8px 0px;
  margin-bottom: 8px;
  width: fit-content;
  text-align: center;
  background-color: white;
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
  place-content: center;
  /* margin: auto; */
`;

export default function Home() {
  return (
    <Wrapper>
      <Data />
    </Wrapper>
  );
}
