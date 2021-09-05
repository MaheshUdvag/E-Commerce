import Header from "./components/Header";
import Footer from "./components/Footer";
import themes from "./theme/colors";
import { ThemeProvider } from "@material-ui/core";
import "@fontsource/roboto";
import { BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import useInitUserInformation from "./hooks/useInitUserInformation";
import routes from "./Routes/Routes";
import RouteUtils from "./Routes/RouteUtils";
import useUserLogin from "./hooks/useUserLogin";

const useStyles = makeStyles((theme) => ({
  app: {
    minHeight: "80vh",
  },
}));

const App = () => {
  const classes = useStyles();
  useInitUserInformation();
  const { authenticated } = useUserLogin();

  return (
    <Router>
      <ThemeProvider theme={themes}>
        <Header />
        <div className={classes.app}>
          {routes.map((route) => (
            <RouteUtils {...route} authenticated={authenticated} />
          ))}
        </div>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
