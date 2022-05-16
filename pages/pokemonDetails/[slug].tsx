import * as React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import pokemonDetailContainer from "../pokemonDetailContainer";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { PokemonDetail } from "../../models/pokemon";
import { Grid } from "@mui/material";

// if we navigate to localhost:3000/blog/123...

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PokemonDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [expanded, setExpanded] = React.useState(false);
  const [pokemonDetail, setPokemonDetail] = React.useState<PokemonDetail>();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const background = router?.asPath.substr(router?.asPath.indexOf("=") + 1);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
      const data = await res.json();
      setPokemonDetail(data);
    };
    fetchDetail().catch(console.error);
  }, []);
  console.log("detail", pokemonDetail);

  return (
    <>
      <div style={{ backgroundColor: background, paddingTop: 10 }}>
        <Card sx={{ maxWidth: 500, margin: "auto", marginTop: 10 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="detail">
                {pokemonDetail?.name.charAt(0).toUpperCase()}
              </Avatar>
            }
            action={<IconButton aria-label="settings"></IconButton>}
            title={pokemonDetail?.name}
          />
          <CardMedia component="img" height="300" image="/pokemon.jpeg" />
          <CardContent style={{ display: "flex", flexDirection: "row" }}>
            <Grid container>
              <Grid
                xs={6}
                sm={6}
                md={6}
                display="flex"
                style={{ alignItems: "center" }}
              >
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  style={{ marginRight: "15px" }}
                >
                  Height :
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {pokemonDetail?.height}
                </Typography>
              </Grid>
              <Grid
                xs={6}
                sm={6}
                md={6}
                display="flex"
                style={{ alignItems: "center" }}
              >
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  style={{ marginRight: "15px" }}
                >
                  Weight :
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {pokemonDetail?.weight}
                </Typography>
              </Grid>
              <Grid xs={12} sm={12} md={12}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  style={{ marginRight: "15px" }}
                >
                  Abilities :
                </Typography>
                <Stack direction="row" spacing={1}>
                  {pokemonDetail?.abilities.map((ele) => (
                    <Chip key={ele?.ability.name} label={ele?.ability.name} />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    </>
  );
}
