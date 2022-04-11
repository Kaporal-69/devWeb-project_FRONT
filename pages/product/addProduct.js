import React from "react";
import {useForm} from "react-hook-form";
import Default from "../../components/layouts/Default";
import {useRouter} from 'next/router'
import {useUser} from "../../context/UserContext";

export default function addProduct({data}) {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const {setUser, setToken, user, token, logout} = useUser();
    const router = useRouter();

    const axios = require('axios');
    const onSubmit = (data) => {
        axios.post('http://localhost:3000/product', data, {
            headers: {
                Authorization : 'Bearer ' + token
            }
        })
            .then(function (response) {
                setToken(response.data.access_token)
                router.push('/product')
            })
    };

    return (
        <section className="vh-50">
            <div className="container py-5 ">
                <div className="row d-flex justify-content-center align-items-center ">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong">
                            <div className="card-body p-5 text-center">

                                <h3 className="mb-5">Add a new product you are ADMIN :)</h3>
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="form-outline mb-4">
                                        <input type="name" placeholder="Name"
                                               className="form-control form-control-lg" {...register("name")}/>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="text" placeholder="Decsription"
                                               className="form-control form-control-lg" {...register("description", {required: true})}/>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="text" placeholder="Price"
                                               className="form-control form-control-lg" {...register("price", {required: true})}/>
                                    </div>

                                    <button className="btn btn-primary btn-lg btn-block" type="submit">ADD
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
