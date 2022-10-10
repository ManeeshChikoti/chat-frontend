import React, { useState, useEffect } from "react";
import styled from "styled-components";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect( () => {
    async function getUsername() {
    setUserName(
      await JSON.parse(
        localStorage.getItem("app-user")
      ).username
    );
}
getUsername()
  }, []);
  return (
    <Container>
    <h1>
      Welcome, <span>{userName}!</span>
    </h1>
    <h3>Please select a chat to Start messaging.</h3>
  </Container>)
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  
  span {
    color: black;
  }
`;