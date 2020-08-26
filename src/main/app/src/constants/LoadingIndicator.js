import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const LoadingIndicator = () => {
  return (
    <Backdrop style={{zIndex: '100', color: '#fff'}} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default LoadingIndicator;
