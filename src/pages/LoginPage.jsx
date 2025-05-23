import React, { useEffect } from 'react'
import { Link, Form, useActionData, useNavigation, useNavigate } from 'react-router'
import axios from 'axios';
import { BASE_URL } from '../assets/conf';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const isLoading = useNavigation().state == "submitting"
    const actiondata = useActionData();
    const navigate = useNavigate()
    const {saveAuthToken, User} = useAuth();

    useEffect(()=>{
        if(actiondata?.data){
            saveAuthToken(actiondata.data);
            navigate("/")
        }
    }, [actiondata]);

  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className='w-full max-w-md p-8 flex flex-col gap-8'>
            <div className="text-center">
                <div className="w-14 m-auto">
                    <img
                        src="/vite.svg"
                        alt="logo"
                        className="h-full w-full object-contain object-center"
                    />
                </div>
                <h1 className='text-xl font-medium'>Welcome Back!!</h1>
            </div>
            
            {!User ?
            <>
                <Form method='post' action='#' className='flex flex-col gap-4'>
                    <div>
                        <label className="w-full input input-primary flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="size-4"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="username"
                                autoComplete='username'
                                required
                                name='username'
                            />
                        </label>
                    </div>

                    <div>
                        <label className="w-full input input-primary flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="size-4"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                type="password"
                                className="grow"
                                placeholder="password"
                                autoComplete='current-password'
                                required
                                name='password'
                            />
                        </label>
                    </div>

                    {
                        actiondata?.error && !isLoading &&  <span className='text-error'>{actiondata?.error}</span>
                    }
                    <label>
                        <button className='btn btn-primary w-full' type={ isLoading ? "button" : "submit"}>
                            { isLoading ? <span className="loading loading-spinner"></span> : "Sign in"}
                        </button>
                    </label>
                </Form>
                <div className='divider my-0'> <span className='text-xs'>Don&apos;t have an account?</span></div>
                <Link to='/register'>
                    <button className='btn btn-secondary w-full btn-outline'>Sign Up</button>
                </Link>
            </> 
            :
            <>
                <button className='btn btn-error w-full btn-outline'>Log Out</button>
            </>
            
            }

        </div>
    </div>
  )
}


export async function loginAction({request}){
    const formData = await request.formData();
    var data = {}
    try{
        const result = await axios.post(BASE_URL + "/token/", formData);
        localStorage.setItem("authToken", JSON.stringify(result.data));
        data.data = result.data;
    }catch(e){
        if(e.status === 401)
           data.error = e.response.data.detail;
    }
    return data;
}