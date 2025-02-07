"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

const SocketContext = createContext({
    socket : null,
    isConnected : null
})

export const useSocket = ()=>{
    return useContext(SocketContext)
}

export const SocketProvider = ({children})=>{
    const [socket,setSocket] = useState()
    const [isConnected,setIsConnected] = useState(false)

    useEffect(()=>{
        const socketInstance = new  ClientIO("http://localhost:3001",{
            path : "/api/socket/io",
            addTrailingSlash : false
        })

        socketInstance.on('connect',()=>{
            setIsConnected(true)
            console.log("connected!!");
            
        })
        socketInstance.on('disconnect',()=>{
            setIsConnected(false)
        })

        setSocket(socketInstance)

        return ()=>{
            socketInstance.disconnect()
        }
    },[])


    return (
        <SocketContext.Provider value={{socket,isConnected}}>
            {children}
        </SocketContext.Provider>
    )
}