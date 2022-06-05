import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
    user: {
        "_id": "629b217752d292b6aefca3c0",
        "username": "Ravi",
        "email": "ravi@gmail.com",
        "password": "$2b$10$eMUFeyElDM/w85WB5KG39OUCg4DvEpnxEwT8G/aivWT/aG/pWu2E6",
        "profilePicture": "",
        "coverPicture": "",
        "followers": [],
        "followings": [
            "629b219152d292b6aefca3c2"
        ],
        "isAdmin": false,
        "createdAt": "2022-06-04T09:10:15.336Z",
        "updatedAt": "2022-06-04T13:09:42.878Z",
        "__v": 0
    },
    isFetching: false,
    error: false        
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}
        >
            { children }
        </AuthContext.Provider>
    )
}