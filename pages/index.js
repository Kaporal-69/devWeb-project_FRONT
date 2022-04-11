import Head from 'next/head'
import Image from 'next/image'
import Test from '../content/test.mdx'

import Default from "../components/layouts/Default";

export default function Home(props) {
    return (
        <Default>
             <section className="jumbotron text-center">
                <div className="container">
                    <h1>Bienvenue sur Pokedex Shop ! </h1>
                    <p className="lead text-muted">
                        Le seul site où vous pouvez acheter des cartes Pokemons
                    </p>
                    <img src="data:image/png;base64,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"/>
                </div>
            </section>
        </Default>
    )
}
