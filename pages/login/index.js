import React, { useState } from 'react';
import {useForm} from "react-hook-form";
import Default from "../../components/layouts/Default";
import {useRouter} from 'next/router'
import {useUser} from "../../context/UserContext";

export default function App() {
    const {setUser, setToken, user, token, logout} = useUser();
    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    const axios = require('axios');
    const onSubmit = (data) => {
        axios.post('http://localhost:3000/auth/login', data).then(function (response) {
            setToken(response.data.access_token);
            setUser(data.name);
        })
    };

    if (user == null) {
        console.log("error profil invalid");
    }

    return (
        <Default>
            {!user &&
                <section className="vh-50" >
                    <div className="container py-5 ">
                        <div className="row d-flex justify-content-center align-items-center ">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card shadow-2-strong" >
                                    <div className="card-body p-5 text-center">

                                        <h3 className="mb-5">Sign in</h3>
                                        <form onSubmit={handleSubmit(onSubmit)}>

                                            <div className="form-outline mb-4">
                                                <input type="name" placeholder="Name"
                                                       className="form-control form-control-lg" {...register("name")}/>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" placeholder="Password"
                                                       className="form-control form-control-lg" {...register("password", {required: true})}/>
                                            </div>

                                            <button className="btn btn-primary btn-lg btn-block" type="submit">Login
                                            </button>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
            {user &&
                <div>
                    <h1> Hello {user} !</h1>
                    <button onClick={logout}>LOGOUT !</button>
                </div>

            }

        </Default>
    );
}