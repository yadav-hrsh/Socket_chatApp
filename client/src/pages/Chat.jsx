import React, { useEffect, useState,useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";
import Contacts from '../components/Contacts';
import { allUserRoute } from '../utils/APIRoutes';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {host} from '../utils/APIRoutes';
import {io} from 'socket.io-client';

const Chat = () => {
  const socket = useRef();
  const [contactsData, setContactsData] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setcurrentChat] = useState(undefined)
  const [isLoaded, setisLoaded] = useState(false)
  const navigate = useNavigate();

  useEffect(async () => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate("/login");
    }
    else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
      setisLoaded(true);
    }
  }, [])

  useEffect(() => {
    if(currentUser){
      socket.current = io(host)
      socket.current.emit('connection',currentUser._id);
    }
  }, [currentUser])
  

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await axios.get(`${allUserRoute}/${currentUser._id}`);
          // console.log(data.users)
          setContactsData(data.users);
          // console.log(contactsData)
        } else {
          navigate("/login");
        }
      }
    }
    fetchData();
  }, [currentUser]);


  const handleChatChange = (chat) => {
    // console.log("line no 44", chat)
    setcurrentChat(chat);
  }


  return (
    <>
      <Container>
        <div className="container">
          {
            contactsData.length != 0 && currentUser && (
              <>
                <Contacts contactsData={contactsData} currentUser={currentUser} ChangeChat={handleChatChange} />
                {
                  isLoaded && currentChat?<ChatContainer currentUser={currentUser} selectedUser={currentChat} socket={socket}/>:<Welcome currentUser={currentUser} />
                }
              </>
            )
          }
        </div>
      </Container>
    </>
  )
}


export default Chat;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;