import React from 'react';
import { useStyles } from '../hooks/useStyles';
import { Button, Card, CardActionArea, CardActions, CardContent, Typography, Box } from '@material-ui/core';

// This is a stateless, functional React component used to render each resource in a card format. 
const VideoCard = ({ data, updateActivity }) => {
  const classes = useStyles();

  if (!data.title) return <div />
  return (
    <Card className="m-3 classes.root" variant="outlined">
      <CardActionArea href={data.url}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>Video</Typography>
          <Typography gutterBottom variant="h5" component="h2">{data.title}</Typography>
          <Typography className={classes.pos} color="textSecondary" component="p">{data.creator}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" href="../schedule-activity" onClick= {() => updateActivity({activityKey: data.key, title: data.title})}>
          Schedule event
        </Button>
      </CardActions>
    </Card>
  );
};

export default VideoCard;
