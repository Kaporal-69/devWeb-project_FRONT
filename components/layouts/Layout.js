import Head from 'next/head';
import Navigation from '../../components/layouts/Navigation';

export default function Home({children, title}) {
    return (

        <div className="bg-gray-300">
            <Navigation/>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="container mx-auto max-w-xl pt-8 min-h-screen">
                {children}
            </main>
        </div>
    );
}