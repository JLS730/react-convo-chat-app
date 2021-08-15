import React, { useState, useEffect } from 'react'
import { ChatEngine } from 'react-chat-engine'
import { useHistory } from 'react-router'

import { auth } from '../firebase'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const Chat = () => {
    const history = useHistory()
    const { user } = useAuth()
    const [loading, setLoading] = useState()

    const handleLogout = async () => {
        await auth.signOut()

        history.push('/')
    }

    const getFile = async (url) => {
        const response = await fetch(url)
        const data = await response.blob()

        return new File([data], 'userImage.jpg', { type: 'image/jpg' })
    }

    useEffect(() => {
        if(!user) {
            history.push('/')
            return
        }

        axios.get('https://api.chatengine.io/users/me/', {
            headers: {
                'Project-ID': '4d12526b-40f4-4520-aa45-7fae380057f6',
                'User-Name': user.email,
                'User-Secret': user.uid
            }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(() => {
            const formData = new FormData()

            formData.append('email', user.email)
            formData.append('username', user.email)
            formData.append('secret', user.uid)

            getFile(user.photoURL)
                .then(avatar => {
                    formData.append('avatar', avatar, avatar.name)

                    axios.post('https://api.chatengine.io/users', formData, {
                        headers: {
                            'private-key': `${process.env.REACT_APP_CHAT_ENGINE_KEY}`
                        }
                    })
                    .then(() => {
                        setLoading(false)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                })
        })
    }, [user, history])

    if(!user || loading) {
        return 'Now Loading...'
    }

    return (
        <React.Fragment>
            <nav className="navigation-bar">
                <h2 className="navigation-title">Convo Chat App</h2>
                <button type='button' className='logout-button' onClick={handleLogout}>Logout</button>
            </nav>
            <div style={{ fontFamily: '\'Noto Sans\', sans-serif' }}>
                <ChatEngine 
                    height='calc(100vh - 50px)'
                    projectID='4d12526b-40f4-4520-aa45-7fae380057f6'
                    userName={user.email}
                    userSecret={user.uid}
                />
            </div>
        </React.Fragment>
    )
}

export default Chat