import { Alert, Button, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentUser, loginUser } from '../../Redux/Auth/Action';
import { authReducer } from '../../Redux/Auth/Reducer';

const SignIn = () => {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [inputData, setInputData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const {auth} = useSelector(store=>store);


    useEffect(() => {
        console.log("UseEffect 1 : Signin");
        if (token) {
            console.log("dispatching currentuser with token :: "+token);
            dispatch(currentUser(token));
        }
    }, [token, auth.reqUser, dispatch]);


    useEffect(() => { 

        console.log("Auth as JSON:", JSON.stringify(auth, null, 2));

        console.log("UseEffect 2 : Signin");


        if (auth.reqUser) {
             
            console.log("navigating on chat page :: " + auth);
            navigate("/");
        }

        console.log("we dont have authuser :: " +auth);
    }, [auth, navigate]);



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form Submitted");
        dispatch(loginUser(inputData));
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputData((values)=>({...values,[name]:value }));
    }

    const handleSnackBarClose = ()=>{
        setOpenSnackBar(false);
    }

    useEffect(() => {
        console.log("UseEffect 1 : Signin");
        if (token) {
            console.log("dispatching currentuser with token :: "+token);
            dispatch(currentUser(token));
        }
    }, [token]);


    useEffect(() => { 

        console.log("Auth as JSON:", JSON.stringify(auth, null, 2));

        console.log("UseEffect 2 : Signin");


        if (authReducer.reqUser?.fullName) {
             
            console.log("navigating on chat page :: " + auth);
            setOpenSnackBar(true);
            navigate("/");
        }

        console.log("we dont have authuser :: " +auth);
    }, [auth.reqUser]);


    return (
        <div>
            <div className='flex justify-center h-screen items-center'>
                <div className='w-[30%] p-10 shadow-md bg-white'>

                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <p className='mb-2'>Email</p>
                            <input type="text" placeholder='Enter your email' name="email" onChange={handleChange} value={inputData.email} className='py-2 outline outline-blue-500 w-full rounded-md border' />
                        </div>
                        <div>
                            <p className='mb-2'>Password</p>
                            <input type="password" placeholder='Enter your password' name="password" onChange={handleChange} value={inputData.password} className='py-2 outline outline-blue-600 w-full rounded-md border' />
                        </div>

                        <div>
                            <Button className='w-full' variant='contained' type='submit' > Signin </Button>
                        </div>
                    </form>

                    <div className='flex space-x-3 items-center mt-5'>
                        <p className='m-0'> Create new account </p>
                        <Button className='' variant='text' onClick={() => navigate("/signup")}>signup</Button>
                    </div>

                </div>
            </div>

            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
                    Login Successfull yeeeee!
                </Alert>
            </Snackbar>

        </div>
    )
}

export default SignIn