import React, { useState, useEffect,useRef } from 'react'
import Logout from './Logout'
import ChatInput from './ChatInput'
import Messages from './Messages'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid';
import { sendMessageRoute, recieveMessageRoute } from '../utils/APIRoutes';
const ChatContainer = ({ currentUser, selectedUser, socket }) => {

    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [messages, setmessages] = useState([])
    const scrollRef = useRef();


    const handlesendMessage = async (msg) => {
        // console.log(currentUser,selectedUser)
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: selectedUser._id,
            message: msg,
        }),
            socket.current.emit("send-msg", {
                to: selectedUser._id,
                from: currentUser._id,
                message: msg
            })

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setmessages(msgs);
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("receive-msg", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setmessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);




    useEffect(() => {
        async function getmsg() {
            if (currentUser) {
                const response = await axios.post(recieveMessageRoute, {
                    from: currentUser._id,
                    to: selectedUser._id,
                })
                setmessages(response.data);
                // console.log(response.data);
            }
        }
        getmsg();
    }, [messages])

    return (
        <div className='flex flex-col h-[85vh] ml-2'>
            <div className='chat-hader p-3 flex flex-row justify-between h-[10%]'>
                <div className='user-details flex space-x-5 items-center'>
                    <div className='avatar'>
                        <img className='h-12 ml-2' src={`data:image/svg+xml;base64,${selectedUser.avatarImage}`}
                            alt="avatar"
                        />
                    </div>
                    <div className='username'>
                        <h3 className='text-white text-xl font-bold'>{selectedUser.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <div className='chat-message h-[80%] space-y-2 overflow-y-auto scrollbar-thumb-slate-900 scrollbar-thin'>
                {
                    messages.map((messages) => (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`${messages.fromSelf ? "sendermsg" : "othermsg"}`}>
                                <div className=''>
                                    <p className='text-white'>
                                        {messages.message}
                                    </p>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
            <div className="chat-input mb-4 h-[10%]">
                <ChatInput handlesendMessage={handlesendMessage} />
            </div>
        </div>
    )
}

export default ChatContainer