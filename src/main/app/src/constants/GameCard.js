import React from 'react';
import { useStyles } from '../hooks/useStyles';
import { Button, Card, CardActionArea, CardActions, CardContent, Typography, Box } from '@material-ui/core';

// This is a stateless, functional React component used to render each resource in a card format. 
const GameCard = ({ activityKey, title, url, description, updateActivity }) => {
  const classes = useStyles();

  if (!title) return <div />
  return (
    <Card className="m-3 classes.root" variant="outlined">
      <CardActionArea href={url}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>Game</Typography>
          <Typography gutterBottom variant="h5" component="h2">{title}</Typography>
          <Typography className={classes.pos} color="textSecondary" component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" href="../schedule-activity" onClick= {() => updateActivity({activityKey: activityKey, title: title})}>
          Schedule event
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameCard;
