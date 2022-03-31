import React from "react";
import {useForm} from "react-hook-form";
import Default from "../../components/layouts/Default";
import useRouter from "next/router";
import Layout from "../../components/layouts/Layout";

export default function Register() {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    var isRegister = false;
    const axios = require('axios');
    const onSubmit = (data) => {
        axios.post('http://localhost:3000/user', data)
            .then(function (response) {
                console.log(response);
                isRegister = true;
            })
            .catch(function (error) {
                console.log(error);
                isRegister = false;
            });
    };

    return (
        <Layout>
            {!isRegister &&
                <section className=" bg-image">
                    <div className="mask d-flex align-items-center gradient-custom-3">
                        <div className="container mt-5">
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div className="card">
                                        <div className="card-body p-5">
                                            <h2 className="text-uppercase text-center mb-3">Create an account</h2>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-outline mb-3">

                                                    <input type="text" placeholder="Your Name"
                                                           className="form-control form-control-lg" {...register("name", {required: true})}/>
                                                </div>
                                                <div className="form-outline mb-3">
                                                    <input type="email" placeholder="Your Email"
                                                           className="form-control form-control-lg" {...register("mail", {required: true})}/>
                                                </div>
                                                <div className="form-outline mb-3">
                                                    <input type="phone" placeholder="Your Phone"
                                                           className="form-control form-control-lg" {...register("phone", {required: true})}/>
                                                </div>
                                                <div className="form-outline mb-3">
                                                    <input type="password" placeholder="Your Password"
                                                           className="form-control form-control-lg" {...register("password", {required: true})}/>
                                                </div>

                                                <div className="d-flex justify-content-center">
                                                    <button type="submit"
                                                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register
                                                    </button>
                                                </div>
                                                <p className="text-center text-muted mt-2 mb-0">Have already an account? <a
                                                    href="/login" className="fw-bold text-body"><u>Login here</u></a></p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }

            {isRegister &&
                <p>Bien joue frerot !</p>
            }
        </Layout>

    )
}