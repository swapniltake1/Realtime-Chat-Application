import { Alert, Button, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentUser, register } from '../../Redux/Auth/Action';

const SignUp = () => {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [inputData, setInputData] = useState({ fullName: "", email: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {auth} = useSelector(store=>store);
    const token = localStorage.getItem("token");


    useEffect(() => {
        if (token && !auth.reqUser) {
            dispatch(currentUser(token));
        }
    }, [token, auth.reqUser, dispatch]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenSnackBar(true);
        console.log("form Sumitted ", inputData);
        dispatch(register(inputData))
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputData((values)=>({...values,[name]:value }))
    };

    const handleSnackBarClose = () => {
        setOpenSnackBar(false);
    };

    useEffect(() => { 
        if (auth.reqUser?.fullName) {
            navigate("/");
        }
    }, [auth, navigate]);
    

    return (
        <div>
            <div className='flex flex-col justify-center min-h-screen items-center'>
                <div className='w-[30%] p-10 shadow-md bg-white'>

                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <p className='mb-2'>Full Name</p>
                            <input type="text" placeholder='Enter your full name' name='fullName' onChange={handleChange} value={inputData.fullName} className='py-2 outline outline-blue-500 w-full rounded-md border' />
                        </div>
                        <div>
                            <p className='mb-2'>Email</p>
                            <input type="text" placeholder='Enter your email' name='email' onChange={handleChange} value={inputData.email} className='py-2 outline outline-blue-500 w-full rounded-md border' />
                        </div>
                        <div>
                            <p className='mb-2'>Password</p>
                            <input type="password" placeholder='Enter your password' name='password' onChange={handleChange} value={inputData.password} className='py-2 outline outline-blue-600 w-full rounded-md border' />
                        </div>

                        <div>
                            <Button className='w-full' variant='contained' type='submit' > SignUp </Button>
                        </div>
                    </form>

                    <div className='flex space-x-3 items-center mt-5'>
                        <p className='m-0'> already have account </p>
                        <Button className='' variant='text' onClick={() => navigate("/signin")}>Login</Button>
                    </div>

                </div>
            </div>

            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
                    Your Account Created Successfully !
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SignUp