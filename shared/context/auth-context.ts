'use client'

import { createContext} from 'react';
import { UserData } from '../hooks/auth-hook';
import AuthHook from '../hooks/auth-hook';



export const AuthContext = createContext (
  {
    isLoggedIn : false, 
    login : (userData : UserData)=> {},
    logout : () => {},
    userId : '',
    type : '',
  }
);



