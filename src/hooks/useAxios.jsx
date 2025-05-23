import React, { useEffect } from 'react'
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";
import { BASE_URL } from '../assets/conf';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export default function useAxios() {

    const {authTokens, saveAuthToken } = useAuth();
    
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 5000,
    });
    const navigate = useNavigate();

    useEffect(()=>{
            instance.interceptors.request.use(async (req) =>{
                //check if acces token is expired
                const u = jwtDecode(authTokens.access);
                const isExpired = dayjs.unix(u.exp).diff(dayjs()) < 1;
                
                if(!isExpired){
                    req.headers.Authorization = `Bearer ${authTokens.access}`;
                    return req;
                }
    
                //access token is expired
                // check if refresh token is expired
                const isExpiredRefresh = dayjs.unix(jwtDecode(authTokens.refresh).exp).diff(dayjs()) < 1;
                if(isExpiredRefresh){
                    toast.error("Session expired. Please login again.");
                    navigate("/login");
                    return
                }
                // get new access tokem from refresh token
                const response = await axios.post(`${BASE_URL}/token/refresh/`,{refresh: authTokens.refresh });
                const tokens = { access: response.data.access, refresh:authTokens.refresh};
                saveAuthToken(tokens);
                req.headers.Authorization = `Bearer ${response.data.access}`;
                return req;
            });
    }, [authTokens, instance]);
    
    return instance;
}
