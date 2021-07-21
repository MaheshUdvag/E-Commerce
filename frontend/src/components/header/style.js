import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(30),
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
    flexGrow: 0.8,
  },
}));
