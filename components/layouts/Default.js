import Head from 'next/head';

import Navigation from "./Navigation";

export default function Default({children}) {

    return (
        <>
            <div>
                <Head>
                    <title>POKEDEX SHOP</title>
                </Head>

            </div>
            <Navigation/>
            <main role="main">
                <div className="album py-5 bg-light">
                    <div className="container">
                        {children}
                    </div>
                </div>
            </main>
        </>

    )
}