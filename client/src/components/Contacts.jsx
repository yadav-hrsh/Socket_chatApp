import React, { Children, useEffect, useState } from 'react'
import Logo from '../assets/logo.svg';
import styled from "styled-components";

function Contacts({ contactsData, currentUser, ChangeChat }) {
    const [currentUserName, setcurrentUserName] = useState(undefined)
    const [currentUserImage, setcurrentUserImage] = useState(undefined)
    const [currentSelected, setcurrentSelected] = useState(undefined)

    useEffect(() => {
        console.log(currentUser)
        if (currentUser) {
            setcurrentUserName(currentUser.username)
            setcurrentUserImage(currentUser.avatarImage)
        }
        console.log(currentUserImage)

    }, [currentUser])

    const changeCurrentChat = (index, contact) => {
        setcurrentSelected(index)
        ChangeChat(contact)
    }

    return (
        <>
            {
                currentUserImage && currentUserImage && (
                    <div className='grid grid-rows-12 h-[85vh] bg-slate-700'>
                        <div className="flex items-center justify-center gap-4 p-3">
                            <img src={Logo} alt="" className='h-[2rem] ' />
                            <h3 className='text-white' style={{ "text-transform": "uppercase" }}>Snappy</h3>
                        </div>
                        {/* map start */}
                        <div className=" flex flex-col items-center gap-[0.8rem] overflow-y-auto scrollbar-thumb-violet-500 scrollbar-thin ">
                            {
                                contactsData.map((contact, index) => {
                                    return (
                                        <div key={index} onClick={() => changeCurrentChat(index, contact)} className={`contact ${index === currentSelected ? "bg-[#9186f3] " : "bg-[#ffffff34] "} min-h-[5rem] cursor-pointer w-[90%] p-2 flex gap-4 items-center transition-[0.5s ease-in-out]`}>
                                            <div>
                                                <img className='h-12' src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                                    alt="avatar"
                                                />
                                            </div>
                                            <div>
                                                <h3 className='text-white'>{contact.username}</h3>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                        {/* map end */}
                        <div className="current-user bg-[#030b30] flex flex-col justify-center items-center">
                            <div>
                                <img className='h-16 ml-2' src={`data:image/svg+xml;base64,${currentUserImage}`}
                                    alt="avatar"
                                />
                            </div>
                            <div className='m-1 flex justify-center items-center'>
                                <h2 className='text-white'>{currentUserName}</h2>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}

export default Contacts

