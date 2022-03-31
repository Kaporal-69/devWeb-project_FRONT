import axios from 'axios'
import Link from 'next/link'
import Layout from '../components/layouts/Layout';

export default function Pokemon({pokemon}) {

    /*const onSearch = (pokemon) => {
        const search = results.map((pokeman, i) => {

        }
    }*/
    return (
        <Layout>
            <div className="container">
                <div className="input-group rounded">
                    <input type="search" className="form-control rounded" placeholder="Search"
                           aria-label="Search" onKeyUp={e => search()}
                           aria-describedby="search-addon"/>
                    <span className="input-group-text border-0" id="search-addon">
                    <i className="bi bi-search"></i>
                    </span>
                </div>
                    <div className="col text-center">
                        {pokemon.map((pokeman, i) => (
                            <div key={i} className="row">
                                <Link href={`/pokemon/${i + 1}`}>
                                    <a className="list-group-item list-group-item-action fs-1">
                                        <img
                                            src={pokeman.image}
                                            className="rounded center"
                                        />
                                        <h1>{pokeman.name}</h1>
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
        </Layout>


    )
}

export async function getStaticProps(context) {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=250');
        const {results} = await res.json();
        const pokemon = results.map((pokeman, i) => {
            const paddedId = ('00' + (i + 1)).slice(-3);

            const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
            return {...pokeman, image};
        });
        return {
            props: {pokemon},
        };
    } catch (err) {
        console.error(err);
    }
}

