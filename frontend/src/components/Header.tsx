import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../actions/categoryActions";
import { logoutUser } from "../actions/userActions";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
  useMediaQuery,
  PopperPlacementType,
  Popper,
  Fade,
  Paper,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useTheme } from "@material-ui/core/styles";
import CartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { useHistory } from "react-router-dom";
import { ICategory } from "./Interface/ICategory";
import useUserLogin from "../hooks/useUserLogin";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 140,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up("md")]: {
      marginLeft: 180,
    },
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
    flexGrow: 0.8,
  },
  topCategories: {
    [theme.breakpoints.up("md")]: {
      marginLeft: 120,
    },
    display: "flex",
  },
  toolBar: {
    backgroundColor: "white",
    height: 45,
    minHeight: 10,
  },
  category: {
    padding: 5,
    margin: 5,
    display: "inline",
  },
  menu: {
    marginTop: 50,
  },
  link: {
    color: "#ffffff",
  },
  menuitem: {
    width: 160,
  },
}));

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [anchorCategoryMenu, setAnchorCategoryMenu] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();

  const handleMenu = (event: any) => {
    // setAnchorEl(event.currentTarget);
  };

  const logOut = () => {
    dispatch(logoutUser());
    handleClose();
    history.push("/");
  };

  const profile = () => {
    handleClose();
    history.push("/profile");
  };

  const categoryList = useSelector((state: any) => {
    return state.categoryListReducer;
  });

  const { user, authenticated } = useUserLogin();

  const { categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
      setSelectedCategory(id);
      setPlacement("bottom");
    } else {
      setAnchorEl(null);
      setSelectedCategory(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography
              onClick={() => history.push("/")}
              variant="h6"
              className={classes.title}
            >
              COMMERCE
            </Typography>
            {!isMobile ? (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </div>
            ) : (
              <div>
                <Button
                  startIcon={<CartIcon />}
                  color="secondary"
                  onClick={() => history.push("/cart")}
                >
                  CART
                </Button>

                <Button
                  startIcon={<AccountCircleIcon />}
                  onClick={(event) =>
                    authenticated ? handleMenu(event) : history.push("/login")
                  }
                  color="secondary"
                >
                  {authenticated ? user.name.toUpperCase() : "SIGN IN"}
                </Button>
              </div>
            )}
          </Toolbar>
          <Toolbar className={classes.toolBar}>
            <div className={classes.topCategories}>
              {categories
                ? categories.map((category: ICategory) => (
                    <div
                      key={category._id}
                      onClick={(event: any) => {
                        handleClick(event, category._id);
                      }}
                    >
                      <Button className={classes.category} color="primary">
                        {category.name.toUpperCase()}
                      </Button>
                      <Popper
                        open={selectedCategory === category._id}
                        id={category._id}
                        anchorEl={anchorEl}
                        placement={placement}
                        transition
                        style={{
                          marginTop: 5,
                          backgroundColor: "#232f3e",
                          maxWidth: 170,
                          borderRadius: 5,
                        }}
                      >
                        {category.subCategories.map((subCategory) => (
                          <Button
                            color="secondary"
                            id="a"
                            key={subCategory._id}
                            onClick={() => {
                              setSelectedCategory(null);
                              setAnchorEl(null);
                              history.push({
                                pathname: `/category/${subCategory.path}`,
                              });
                            }}
                            fullWidth={true}
                            style={{ padding: "10px", minWidth: 170 }}
                          >
                            {subCategory.name}
                          </Button>
                        ))}
                      </Popper>
                    </div>
                  ))
                : null}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Header;
