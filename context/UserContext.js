import React, { createContext, useContext, useEffect, useState } from "react";
const Context = createContext({
    token: null,
    user : null
});
function UserContext({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const axios = require('axios');
    useEffect(() => {
        if (!token) {
            setUser(null);
            return
        }
        const onSubmit = (data) => {
            axios.get(`http://localhost:3000/profile`, data).then(function (response) {
                headers: {
                    Authorization: 'Bearer ' + response.data.access_token
                }
            })
                .then(function (response) {
                    setUser(response)
                    console.log(setUser(), "setUser")
                    // router.push('login')
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

    }, [token]);
    const logout= () => {
        setUser(null);
        setToken(null);
    }
    return (
        <Context.Provider value={{token, user, setToken, setUser, logout}}>
            {children}
        </Context.Provider>
    );
}
export const useUser = () => useContext(Context);
export default UserContext;