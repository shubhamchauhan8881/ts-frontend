import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { BASE_URL } from '../assets/conf';
import { toast } from 'react-toastify';
import { usePopup } from '../context/PopupContext';


const Login = () => {

    const {closePopup} = usePopup()
    const {saveAuthToken} = useAuth()

    const [formData, setFormData] = useState({username:"", password:"", first_name:"", last_name:"", email:""});
    const [Mode, setMode] = useState("login")
    
    const handleInputChange = (e)=> setFormData(prev=>{return {...prev, [e.target.name]:e.target.value}})


    const {isPending, mutateAsync} = useMutation({
        mutationFn: async(data)=>{
            if(!data.username || !data.password) throw new Error("All fields are required.");
            if(Mode == "register" && (!data.first_name && !data.last_name)) throw new Error("All fields are required.");

            let url = BASE_URL + "/token/"
            if(Mode == "register") url = BASE_URL + "/user/register/";
            return await axios.post(url , {...data, email:data.username });
        },
        onSuccess: (data)=>{
            if(Mode == "register"){
                toast.success("Account Created.");
                toast.info("Login your account.");
                setMode("login");
                return;
            }
            saveAuthToken(data.data);
            closePopup();
            toast.success("Login Successfull.");
        },
        onError:(e)=>{toast.error(e.response.data.detail); console.log(e)}
    });
    
    return (

    <div className="w-96">
        <div className="flex items-center space-y-4 py-8 px-12 font-semibold text-gray-500 flex-col">

        <img src='/vite.svg' className='size-14'/>
        
        <h1 className="text-2xl text-center">Sign {Mode == "login"? "in":"up"} to <span className='gradient-text'>TempSpace</span></h1>
        {
            Mode == "register" && <>
                <input value={formData.first_name} onChange={handleInputChange} className="input input-primary w-full bg-transparent text-primary-content" placeholder="First Name" type="text" name="first_name"  />
                <input value={formData.last_name} onChange={handleInputChange} className="input input-primary w-full bg-transparent text-primary-content" placeholder="Last Name" type="test" name="last_name"  />
            </>
        }
        <input value={formData.username} onChange={handleInputChange} className="input input-primary w-full bg-transparent text-primary-content" placeholder="Email" type="email" name="username"  />
        <input value={formData.password} onChange={handleInputChange} className="input input-primary w-full bg-transparent text-primary-content" placeholder="Password" type="password" name="password"  />
        <button onClick={()=>mutateAsync(formData)} className="btn btn-primary w-full rounded-full" disabled={isPending}>Submit</button>
        <div className='divider'>{Mode == "login"? "Don't":"Already"} have an account?</div>
        
            {
                Mode == "login" ?
                <button  className="btn btn-secondary btn-outline w-full rounded-full" onClick={()=> setMode("register")}>Register</button>
                :
                <button  className="btn btn-secondary btn-outline w-full rounded-full" onClick={()=> setMode("login")}>Login</button>

            }
        
        </div>
    </div>

    )

    
  
}

export default Login;
