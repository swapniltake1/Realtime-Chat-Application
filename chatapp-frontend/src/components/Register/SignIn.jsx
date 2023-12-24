import { Alert, Button, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [inputData, setInputData] = useState({ email: "", password: "" });
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenSnackBar(true);
        console.log("form Sumitted ");
    }

    const handleChange = () => {

    }

    const handleSnackBarClose = ()=>{
        setOpenSnackBar(false);
    }

    return (
        <div>
            <div className='flex justify-center h-screen items-center'>
                <div className='w-[30%] p-10 shadow-md bg-white'>

                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <p className='mb-2'>Email</p>
                            <input type="text" placeholder='Enter your email' onChange={handleChange} value={setInputData.email} className='py-2 outline outline-blue-500 w-full rounded-md border' />
                        </div>
                        <div>
                            <p className='mb-2'>Password</p>
                            <input type="password" placeholder='Enter your password' onChange={handleChange} value={setInputData.password} className='py-2 outline outline-blue-600 w-full rounded-md border' />
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