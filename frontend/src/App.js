import Header from "./components/header";
import Footer from "./components/footer";
import themes from "./theme/colors";
import { ThemeProvider } from "@material-ui/core";
import "@fontsource/roboto";
import HomePage from "./screens/HomePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductPage from "./screens/ProductPage";
import CategoryPage from "./screens/CategoryPage";

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={themes}>
        <Header />
        <Route path="/" component={HomePage} exact></Route>
        <Route path="/products" component={ProductPage} exact></Route>
        <Route path="/category/:name" component={CategoryPage} exact></Route>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
