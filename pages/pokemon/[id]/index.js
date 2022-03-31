import Link from 'next/link'
import Navigation from "../../../components/layouts/Navigation";
import Layout from '../../../components/layouts/Layout';
import Default from '../../../components/layouts/Layout';

export default function Home({pokeman}) {
    return (
        <Layout title={pokeman.name}>
            <div>
                <Link href="/pokemon">
                    <a><i className="bi bi-arrow-left-square-fill display-4 m-2"></i></a>
                </Link>
                <Link href="/panier">
                    <a><i id="panier" className="bi bi-cart4 display-4 m-2"></i></a>
                </Link>
            </div>

            <div className="row text-center ">
                <div className="col-sm-4 center-block">
                    <h1 className="text-4xl mb-2 text-center capitalize">
                        {pokeman.id}. {pokeman.name}
                    </h1>
                    {pokeman.types.map((type, index) => (
                            <span className="badge border rounded-pill me-1 bg-warning"
                                  key="index">{type.type.name}</span>
                    ))}
                    <ul className="list-group list-group-flush mt-2">
                        <li className="list-group-item bg-transparent">Experience : <b
                            className="float-end">{pokeman.base_experience}</b></li>
                        <li className="list-group-item bg-transparent">Height : <b
                            className="float-end">{pokeman.height}</b></li>
                        <li className="list-group-item bg-transparent">Weight : <b
                            className="float-end">{pokeman.weight}</b></li>
                    </ul>
                    <img id="img-pokemon" className="mx-auto" src={pokeman.image} alt={pokeman.name}/>
                </div>
            </div>

        </Layout>

    )
}

export async function getServerSideProps({query}) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeman = await res.json();
        const paddedId = ('00' + id).slice(-3);
        pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        return {
            props: {pokeman},
        };
    } catch (err) {
        console.error(err);
    }
}
