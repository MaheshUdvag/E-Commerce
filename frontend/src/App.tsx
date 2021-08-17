import Header from "./components/Header";
import Footer from "./components/Footer";
import themes from "./theme/colors";
import { ThemeProvider } from "@material-ui/core";
import "@fontsource/roboto";
import HomePage from "./screens/HomePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CategoryPage from "./screens/CategoryPage";
import ProductDetailPage from "./screens/ProductDetailPage";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage";
import ProfilePage from "./screens/ProfilePage";
import CartPage from "./screens/CartPage";
import { makeStyles } from "@material-ui/core/styles";
import useInitUserInformation from "./hooks/useInitUserInformation";

const useStyles = makeStyles((theme) => ({
  app: {
    minHeight: "60vh",
  },
}));

const App = () => {
  const classes = useStyles();
  useInitUserInformation();

  return (
    <Router>
      <ThemeProvider theme={themes}>
        <Header />
        <div className={classes.app}>
          <Route path="/" component={HomePage} exact></Route>
          <Route path="/category/:name" component={CategoryPage} exact></Route>
          <Route path="/login" component={LoginPage} exact></Route>
          <Route path="/register" component={RegisterPage} exact></Route>
          <Route
            path="/product/:name"
            component={ProductDetailPage}
            exact
          ></Route>
          <Route path="/profile" component={ProfilePage} exact></Route>
          <Route path="/cart" component={CartPage} exact></Route>
        </div>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
