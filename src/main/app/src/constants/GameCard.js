import React from 'react';
import { useStyles } from '../hooks/useStyles';
import { Button, Card, CardActionArea, CardActions, CardContent, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

// This is a stateless, functional React component used to render each resource in a card format.
const GameCard = ({ data, updateScheduleActivity, parameters, buttonText }) => {
  const classes = useStyles();

  if (!data.title) return <div />
  return (
    <Card className="m-3 classes.root" variant="outlined">
      <CardActionArea href={data.url} target="_blank">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>Game</Typography>
          <Typography gutterBottom variant="h5" component="h2">{data.title}</Typography>
          <Typography className={classes.pos} color="textSecondary" component="p">{data.notes}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to='/schedule-activity'>
          <Button size="small" onClick= {() => updateScheduleActivity(parameters)}>
            {buttonText}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default GameCard;
