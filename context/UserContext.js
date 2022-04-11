import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const Context = createContext({
    token: null,
    user: null
});
function UserContext({ children }) {
    const router = useRouter()
    const axios = require('axios');
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!token) {
            setToken(null);
            return
        }
        axios.get('http://localhost:3000/profile', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(function (response) {
            console.log(response)
            setUser(response.data)
        })
    }, [token]);
    const logout = () => {
        router.push('login')
        setUser(null);
        setToken(null);
    }
    return (
        <Context.Provider value={{ token, user, setToken, setUser, logout }}>
            {children}
        </Context.Provider>
    );
}
export const useUser = () => useContext(Context);
export default UserContext;