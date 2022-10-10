import React,{ useState, useEffect } from 'react'
import styled from "styled-components";
// import "./contacts.css"
export default function Contacts({ contacts, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    useEffect(() => {
      async function getData() {
        const data = await JSON.parse(
          localStorage.getItem("app-user")
        );
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatar);
      }
      getData()
      }, []);
      const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
      };
  return (
    <div>
           {currentUserImage && currentUserImage && (
        <Container>
          <div className="Logo">
            <h3>Let's Chat</h3>
          </div>
     
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div >
                    <img className="avatar"
                      src={contact.avatar}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h4>{contact.username}</h4>
                  </div>
                </div>
              );
            })}
             
          </div>
          <div className="current-user">
            <div >
              <img className="avatar"
                src={currentUserImage}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h4>{currentUserName}</h4>
            </div>
          </div>
        </Container>
        
      )}
    </div>
  )
   }
  const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color:#52616B;
  .Logo{
    h3 {
      text-align: center;
    text-shadow: 2px 2px 4px  white;
    font-size: 20px;
    
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #1E2022;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 5px;
      padding: 3px;
      display: flex;
      gap: 5px;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height:30px ;
          width: 30px;
          object-fit:cover;
          border-radius: 50%;
        }
      }
      .username {
        h4{
          color: white;
        }
      }
    }
    .selected {
      background-color: #C9D6DF;
    }
  }
  .current-user {
    background-color: #4C6793;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height:30px ;
        width: 30px;
        object-fit:cover;
        border-radius: 50%;
      }
    }
    .username {
      h4 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h4{
          font-size: 1rem;
        }
      }
    }
  }
`;


