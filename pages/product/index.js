import React from "react";
import {useForm} from "react-hook-form";
import Default from "../../components/layouts/Default";
import {useRouter} from 'next/router'
import {useUser} from "../../context/UserContext";
import addProduct from "./addProduct";
import Link from 'next/link'


export default function Product({data}) {
    const {setUser, setToken, user, token, logout} = useUser();
    const {register, handleSubmit, watch, formState: {errors}} = useForm();

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
                        {user.role === 'admin' &&
                            <th><Link href="/product/addProduct"><a className="btn btn-primary" ><i className="bi bi-plus"></i></a></Link></th>
                        }
                        {user.role === 'user' &&
                            <th>#</th>
                        }
                    </tr>
                    </thead>
                    <tbody>

                    {data.map((product) => {
                        return <tr>
                            <td></td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price} €</td>
                            {user.role === 'admin' &&
                                <td>##</td>
                            }
                            {user.role === 'user' &&
                                <th><Link href="/panier"><a className="btn btn-primary" ><i className="bi bi-cart-check"></i></a></Link></th>
                            }

                        </tr>
                    })}

                    </tbody>
                </table>
            }

            {!user &&
                <p>Veuillez-vous connecter pour accéder a la liste de nos produits</p>
            }

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