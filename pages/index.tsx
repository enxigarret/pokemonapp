import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import PokemonList from "./pokemonList";

const Home: NextPage = (props) => {
  console.log("the props", typeof props);
  return (
    <div className={styles.container}>
      <Head>
        <title>My Pokemon App</title>
        <meta name="description" content="pokemon app" />
        <link rel="icon" href="/pokemonIcon.png" />
      </Head>
      <main className={styles.main}>
        <div>
          {/* <h1>Welcome to My Pokemon</h1> */}

          <div>
            <PokemonList {...props}></PokemonList>
          </div>
        </div>
      </main>
    </div>
  );
};

// This gets called on every request
Home.getInitialProps = async (ctx) => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon");

  const json = await res.json();
  console.log("the initial", json);
  return { json: json.results };
};

export default Home;
