import React, { useState } from 'react'
import { Link, useActionData, useNavigate, useNavigation } from 'react-router'
import axios from 'axios';
import { BASE_URL } from '../assets/conf';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';


export default function RegisterPage() {
    const navigate = useNavigate();

    const [value, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setValues( (prev)=>  { return {...prev, [e.target.name]: e.target.value  } }  )
    }
    
    const register = async (value) => {
        const res = await axios.post(BASE_URL + "/user/register/", value);
        return res;
    }

    const { mutateAsync, isPending :isLoading, isError, error } = useMutation({
        mutationFn: register,
        onSuccess: () => {
            toast.success("Registration Successfull!! Please login.");
            navigate("/login");
        }
    })


     const handleSubmit = async (e) => {
         e.preventDefault();
         mutateAsync(value);
    }


  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className='w-full max-w-md p-8 flex flex-col gap-8'>
            <div className="">
                <div className="w-10">
                    <img
                        src="/vite.svg"
                        alt="logo"
                        className="h-full w-full object-contain object-center"
                    />
                </div>
                <h1 className='text-4xl mt-4 font-medium'>Register</h1>
            </div>
            

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            

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
                        placeholder="First Name"
                          name='first_name'
                          value={value.first_name}
                          onChange={handleChange}
                    />
                </label>
                        
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
                        placeholder="Last Name"
                          name='last_name'
                          value={value.last_name}
                          onChange={handleChange}
                    />
                </label>
                        
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
                        type="email"
                        className="grow"
                        placeholder="Email"
                          name='email'
                          value={value.email}
                          onChange={handleChange}
                    />
                </label>
                        
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
                          name='password'
                           value={value.password}
                          onChange={handleChange}
                    />
                  </label>
                  
                  {isError &&
                      <div>{Object.keys(error.response.data).map((key, index) => {
                          return <div key={index}>
                              <span className='capitalize font-medium text-error'>{ key.split("_",).join(" ") }: </span>
                              {error.response.data[key]}
                          </div>
                      } ) }</div>
                      
                  }

                <label>
                    <button className='btn btn-primary w-full' type={ isLoading ? "button" : "submit"}>
                        { isLoading ? <span className="loading loading-spinner"></span> : "Submit"}
                    </button>
                </label>
            </form>
            <div className='divider my-0'> <span className='text-xs'>Already have an account?</span></div>
            <Link to='/login'>
                <button className='btn btn-secondary w-full btn-outline'>Login</button>
            </Link>


        </div>
    </div>
  )
}


// export async function registerAction({request}){
//     const formData = await request.formData();
//     var data = {}
//     try{
//         const result = await axios.post(BASE_URL + "/user/register/", formData);
//         console.log(result)
//         data.success = true;
//     } catch (e) {
        
//         if(e.status === 400)
//            data.error = e.response.data;
//     }
//     return data;
// }