import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/CardList.module.css";
import Link from "next/link";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";

import { randomColor } from "./../styles/RadomColor";
import { Grid } from "@mui/material";

interface PokeProps {
  json: [];
}

interface CardProps {
  //image:string;
  name: string;
  url: string;
}

interface Cards {
  cards: CardProps[];
}

export default function PokemonList(props: PokeProps): JSX.Element {
  const router = useRouter();
  const results = props?.json;

  console.log(results);

  const onSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    router.push("/verify-email");
  };

  // in Jsx must return in map
  return (
    <div className="wrapper">
      <>
        <h1 className="header">My Pokemon(s)</h1>
        <Grid container>
          {results?.map((element) => {
            return <CategoryCard key={element} {...element} />;
          })}
        </Grid>
      </>
    </div>
  );
}

const CategoryCard = (card: CardProps) => {
  const random = randomColor();
  console.log("the props ca", card?.name);
  const index = card?.url.charAt(34);
  console.log("i", index);

  return (
    <>
      <Grid item xs={3} sm={3} md={3} className={styles.card}>
        <Link href={`/pokemonDetails/${index}?color=${random}`}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: random }} aria-label="spice">
                  {card?.name.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={card?.name}
            />
          </Card>
        </Link>
      </Grid>
    </>
  );
};
