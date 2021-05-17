import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import db from '../firebase'
import { useStateValue } from '../StateProvider'
import firebase from 'firebase'
import './Chat.css'

const Chat = () => {

    const [input, setInput] = useState('')
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStateValue()

    const sendMessage = (e) => {
        e.preventDefault()

        db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput('')
    }

    useEffect(() => {
        if(roomId) {
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot((snapshot) => {
                setRoomName(snapshot.data().name)
            });

            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                    setMessages(snapshot.docs.map((doc) => 
                        doc.data()
                    ))
            })
        }

       
    }, [roomId])

    return (
        <div className = "chat">
            <div className = "chat_header">
                <Avatar src = {`https://avatars.dicebear.com/api/male/%3Blkj.svg`}/>
                <div className = "chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen at {" "} {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>

                <div className = "chatHeaderRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className = "chat_body">

                {messages.map((message, id) => (

                        <p key = {id} className = {`chat_message ${message.name === user.displayName && `chat_receiver`}`}>
                        <span className = "chat_name">{message.name}</span>
                        {message.message}
                        <span className = "chat_timestamp"> {new Date(message.timestamp?.toDate()).toUTCString()}.</span>
                        </p>
                ))}
                
                    
            </div>

            <div className = "chat_footer">
                    <InsertEmoticon/>
                    <form onSubmit = {sendMessage}>
                        <input
                            placeholder = "Type message..."
                            value = {input}
                            onChange = {(e) => setInput(e.target.value)}
                        />
                        
                    </form>

                    <Mic/>
            </div>
        </div>
    )
}

export default Chat
