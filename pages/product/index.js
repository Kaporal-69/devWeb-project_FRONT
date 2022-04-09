import React from "react";
import {useForm} from "react-hook-form";
import Default from "../../components/layouts/Default";
import {useRouter} from 'next/router'
import {useUser} from "../../context/UserContext";


export default function Product({data}) {
    const {setUser, setToken, user, token, logout} = useUser();
    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    const axios = require('axios');
    const onSubmit = (data) => {
        axios.get('http://localhost:3000/product', data).then(function (response) {
            setToken(response.data.access_token);
            setUser(data.name);
            console.log(data, "data");
        })

    };

    return (
        <Default>
            <h1>LISTE DES CARTES DISPONIBLES</h1>
            {user &&
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>

                        <td>{data.name}</td>
                        <td>{data.description}</td>
                        <td>{data.price}</td>

                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </table>
            }
            {!user &&
                <p>Il faut vous connectez, pour voir la liste des cartes !</p>
            }
        </Default>
    )
}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/product`);
    const data = await res.json();
    console.log(data, "data");
    // Pass data to the page via props
    return { props: { data } }
}