import { BASE_API_URL } from "../../Config/Config"
import { CREATE_CHAT, CREATE_GROUP, GET_ALL_CHAT } from "./ActionType";


export const createChat =(chatData) => async (dispatch) =>{
    console.log("chatdata", chatData);
try {
    const res = await fetch(`${BASE_API_URL}/api/chats/single`, {
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
            Authorization:`Bearer ${chatData.token}`
        },
        body:JSON.stringify(chatData.data)
    })

    const data = await res.json();
    console.log("Chat data from server", data);
    dispatch({type:CREATE_CHAT,payload:data});
} catch (error) {
    console.log("Something went wrong in chat Action (CreateChat):: UI Error :: ",error);
}
}

export const createGroupChat =(chatData) => async (dispatch) =>{
    try {
        const res = await fetch(`${BASE_API_URL}/api/chats/group`, {
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                Authorization:`Bearer ${chatData.token}`
            },
            body:JSON.stringify(chatData.group)
        })
    
        const data = await res.json();
        console.log("Create Group Server Response :: ", data);
        dispatch({type:CREATE_GROUP,payload:data});
    } catch (error) {
        console.log("Something went wrong in chat Action (CreateGroupChat) :: UI Error :: ", error);
    }
    }

    export const getUserChat =(chatData) => async (dispatch) =>{
        try {
            const res = await fetch(`${BASE_API_URL}/api/chats/user`, {
                method:"GET",
                headers:{
                    "Content-Type" : "application/json",
                    Authorization:`Bearer ${chatData.token}`
                },
                
            })
        
            const data = await res.json();
            console.log("Get all chats from server", data);
            dispatch({type:GET_ALL_CHAT,payload:data});
        } catch (error) {
            console.log("Something went wrong in chat Action (CreateGroupChat) :: UI Error :: ", error);
        }
        }