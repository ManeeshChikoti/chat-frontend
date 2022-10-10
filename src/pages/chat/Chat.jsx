import React from 'react';
import { useState ,useEffect,useRef} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { io } from "socket.io-client";
import { allUsersRoute,host } from "../../Utils/ApiRoutes";
import styled from "styled-components";
// import "./chat.css";
import Contacts from '../../components/contacts/Contacts';
import Welcome from '../../components/welcome/Welcome';
import ChatContainer from '../../components/chatContainer/ChatContainer';

function Chat() {
  const navigate = useNavigate();
   const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  useEffect( () => {
    async function storage(){
    if (!localStorage.getItem("app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem("app-user")
        )
      );
    }}
    storage();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchData() {
    if (currentUser) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        console.log(data)
        setContacts(data.data);
      
    }}
    fetchData();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </Container>
  </>
  )
}

export default Chat
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #F0F5F9;;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #C9D6DF;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
