import { makeStyles } from '@material-ui/core/styles';

/** CSS styles for material ui components. */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    flexWrap: "wrap",
    paddingTop: '1.8rem',
    paddingBottom: '1.8rem',
    margin: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  gridItem: {
   padding: 0
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  input: {
    flex: 1
  },
  button: {paddingLeft: '1rem'},
  chipsList: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const custom = {
  guestInput: {
    paddingRight: '1rem'
  },
  largeButton: {
    padding: '1rem 2rem',
    margin: '0px auto',
    fontSize: '1.1rem'
  },
}

export { useStyles, custom }
