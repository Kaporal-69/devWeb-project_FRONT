import React from "react";
import {useForm} from "react-hook-form";
import Default from "../../components/layouts/Default";
import {useRouter} from 'next/router'
import {useUser} from "../../context/UserContext";


export default function Product({data}) {
    const {setUser, setToken, user, token, logout} = useUser();
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        axios.post('http://localhost:3000/auth/login', data).then(function (response) {
            setToken(response.data.access_token);
            setUser(data.name);
        })

    };
console.log(user, "user")

    return (
        <Default>
            <h1>LISTE DES CARTES DISPONIBLES</h1>
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

                        {data.map((product) => {
                            return <tr>
                                <td></td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price} €</td>
                            </tr>
                        })}

                    </tbody>
                </table>
        </Default>
    )
}
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/product`);
    const data = await res.json();
    // Pass data to the page via props
    return { props: { data } }
}