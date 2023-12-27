import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";
import { BASE_API_URL } from "../../Config/Config"


export const createMessage =(messageData) => async (dispatch) =>{
    try {
        const res = await fetch(`${BASE_API_URL}/api/messages/create`, {
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                Authorization:`Bearer ${messageData.token}`
            },
            body:JSON.stringify(messageData.data)
        })
    
        const data = await res.json();
        console.log("Message data from server", data);
        dispatch({type:CREATE_NEW_MESSAGE,payload:data});
    } catch (error) {
        console.log("Something went wrong in Message Action (CreateMessage) :: UI Error :: ", error);
    }
    }

    export const getAllMessages =(reqData) => async (dispatch) =>{
        console.log(reqData.token);
        try {
            const res = await fetch(`${BASE_API_URL}/api/messages/chat/${reqData.chatId}`, {
                method:"GET",
                headers:{
                    "Content-Type" : "application/json",
                    Authorization:`Bearer ${reqData.token}`
                },
               
            })
              
            const data = await res.json();
            console.log("getall message :: ", data);
            dispatch({type:GET_ALL_MESSAGE,payload:data});
        } catch (error) {
            console.log("Something went wrong in MEssage Action (GetALLMESSAGES) :: UI Error :: ", error);
        }
        }