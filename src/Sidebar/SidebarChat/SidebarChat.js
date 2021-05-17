import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import db from '../../firebase'
import'./SidebarChat.css'

const SidebarChat = ({addNewChat, id, name}) => {

    const [seed, setSeed] = useState('')
    const [messages, setMessages] = useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])



    const createChat = () => {
        const roomName = prompt("Enter room name")

        if (roomName) {
            db.collection('rooms')
            .add({
                name: roomName
            })
        }
    }

    useEffect(() => {
        if(id){
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())))
        }
    }, [id])

    return !addNewChat ? (
        <Link to = {`/rooms/${id}`}>
        <div className = "sidebarChat">
            
            <Avatar src = {`https://avatars.dicebear.com/api/male/${seed}.svg`}/>
            <div className = "sidebarChat_info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>

        </div>
        </Link>
    ) :
    (<div onClick = {createChat} className = "sidebarChat">
        <h2>Add new Chat</h2>
    </div>)
}

export default SidebarChat
