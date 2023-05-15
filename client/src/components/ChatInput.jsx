import React, { Component, useState } from 'react'
import Picker from 'emoji-picker-react';
import styled from "styled-components";
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

const ChatInput = ({handlesendMessage}) => {
    const [showEmojiPicker, setshowEmojiPicker] = useState(false)
    const [msg, setmsg] = useState("");

    const handleEmojipicker = () => {
        setshowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event, emojiObject) => {
        console.log(event)
        let message = msg;
        message += event.emoji;
        setmsg(message);
    };

    const sendchat = (e) => {
        e.preventDefault();
        if(msg.length>0){
            handlesendMessage(msg);
            setmsg("");
        }
    }

    return (
        <div className="chat-input w-[100%] space-x-2 flex items-center justify-between ">
            <div className='button-container w-[3%] pl-1'>
                <div className="emoji text-2xl">
                    <BsEmojiSmileFill onClick={handleEmojipicker} style={{ color: "yellow" ,"cursor":"pointer"}} />
                    <div className="absolute bottom-[150px]">
                        {showEmojiPicker && <Picker className="" onEmojiClick={handleEmojiClick} />}
                    </div>
                </div>
            </div>

            <form action="" className='w-[96%] flex items-center' onSubmit={(e)=>sendchat(e)}>
                <input type="text" className=' font-mono w-[95%] rounded-2xl p-2 bg-slate-900 text-white' placeholder='Message...' value={msg} onChange={(e) => setmsg(e.target.value)} />
                <button className='ml-2  flex items-center  justify-center text-2xl bg-violet-600 px-3 py-2 rounded-xl'><IoMdSend style={{ color: "white" }} /></button>
            </form>
        </div>

    )
}

export default ChatInput

