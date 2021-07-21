import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../actions/categoryActions";
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
    padding: 10,
  },
  menu: {
    marginTop: 50,
  },
  link: {
    color: "#ffffff",
  },
}));

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorCategoryMenu, setAnchorCategoryMenu] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoryMenu = (event) => {
    setAnchorCategoryMenu(event.currentTarget);
  };

  const categoryList = useSelector((state) => {
    return state.categoryListReducer;
  });
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
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button startIcon={<CartIcon />} color="secondary">
                  CART
                </Button>
                <Button startIcon={<AccountCircleIcon />} color="secondary">
                  SIGN IN
                </Button>
              </div>
            )}
          </Toolbar>
          <Toolbar className={classes.toolBar}>
            <div className={classes.topCategories}>
              {categories
                ? categories.map((category) => (
                    <div key={category._id}>
                      <Button
                        className={classes.category}
                        color="primary"
                        onClick={handleCategoryMenu}
                      >
                        {category.name.toUpperCase()}
                      </Button>
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
                          open={Boolean(anchorCategoryMenu)}
                          onClose={() => setAnchorCategoryMenu(null)}
                        >
                          {category.subCategories.map((subCategory) => (
                            <MenuItem
                              key={subCategory._id}
                              onClick={() => {
                                setAnchorCategoryMenu(null);

                                const categoryName = subCategory.name.replace(
                                  /\s/g,
                                  ""
                                );
                                history.push({
                                  pathname: `/category/${categoryName}`,
                                  state: { category: subCategory },
                                });
                              }}
                            >
                              {subCategory.name}
                            </MenuItem>
                          ))}
                        </Menu>
                      ) : null}
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
