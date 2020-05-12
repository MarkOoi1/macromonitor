import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import EmojiObjectsRoundedIcon from "@material-ui/icons/EmojiObjectsRounded";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  ideaContainer: {
    right: theme.spacing(1),
    bottom: theme.spacing(1),
    position: "fixed",
    zIndex: 500,
  },
  ideaIcon: {
    fontSize: 50,
    color: theme.palette.secondary.main,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  cardroot: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

export default function Idea() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {["Create a Theme", "Analyse Tactics", "Review"].map((text, index) => (
        <Card className={classes.cardroot} key={index}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`/images/cards/${index}.png`}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {text}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to="/themes/strategy" size="small" color="primary">
              Create a Theme
            </Link>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );

  return (
    <div className={classes.ideaContainer}>
      <React.Fragment key={"right"}>
        <EmojiObjectsRoundedIcon
          className={classes.ideaIcon}
          onClick={toggleDrawer("right", true)}
        />
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {list("right")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
