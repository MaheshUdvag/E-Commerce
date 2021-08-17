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
  },
  toolBar: {
    backgroundColor: "white",
    height: 45,
    minHeight: 10,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
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

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const logOut = () => {
    dispatch(logoutUser());
    handleClose();
  };

  const profile = () => {
    handleClose();
    history.push("/profile");
  };

  const categoryList = useSelector((state: any) => {
    return state.categoryListReducer;
  });

  const { user } = useUserLogin();

  const { categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

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
                <Menu
                  id="menu-appbar"
                  className={classes.menu}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={profile}>Profile</MenuItem>
                  <MenuItem onClick={logOut}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button
                  startIcon={<CartIcon />}
                  color="secondary"
                  onClick={() =>
                    user && Object.keys(user).length > 0
                      ? history.push("/cart")
                      : null
                  }
                >
                  CART
                </Button>

                <Button
                  startIcon={<AccountCircleIcon />}
                  onClick={(event) =>
                    user && Object.keys(user).length > 0
                      ? handleMenu(event)
                      : history.push("/login")
                  }
                  color="secondary"
                >
                  {user && Object.keys(user).length > 0
                    ? user.name.toUpperCase()
                    : "SIGN IN"}
                </Button>

                {user ? (
                  <Menu
                    id="menu-appbar"
                    className={classes.menu}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={profile}>Profile</MenuItem>
                    <MenuItem onClick={logOut}>Logout</MenuItem>
                  </Menu>
                ) : null}
              </div>
            )}
          </Toolbar>
          <Toolbar className={classes.toolBar}>
            <div className={classes.topCategories}>
              {categories
                ? categories.map((category: ICategory) => (
                    <React.Fragment key={category._id}>
                      <div style={{ display: "inline-block" }}>
                        <Button
                          className={classes.category}
                          color="primary"
                          onClick={(event) => {
                            setAnchorCategoryMenu(null);
                            setSelectedCategory(null);
                            setAnchorCategoryMenu(event.currentTarget);
                            setSelectedCategory(category._id);
                          }}
                        >
                          {category.name.toUpperCase()}
                        </Button>
                      </div>
                      {category.subCategories ? (
                        <Menu
                          className={classes.menu}
                          id="menu-appbar"
                          anchorEl={anchorCategoryMenu}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={Boolean(selectedCategory === category._id)}
                          onClose={() => {
                            setAnchorCategoryMenu(null);
                            setSelectedCategory(null);
                          }}
                        >
                          {category.subCategories.map((subCategory) => (
                            <MenuItem
                              key={subCategory._id}
                              className={classes.menuitem}
                              onClick={() => {
                                setAnchorCategoryMenu(null);
                                setSelectedCategory(null);
                                history.push({
                                  pathname: `/category/${subCategory.path}`,
                                });
                              }}
                            >
                              {subCategory.name}
                            </MenuItem>
                          ))}
                        </Menu>
                      ) : null}
                    </React.Fragment>
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
