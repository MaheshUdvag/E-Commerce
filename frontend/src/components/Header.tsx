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
  Button,
  useMediaQuery,
  PopperPlacementType,
  Popper,
  ClickAwayListener,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useTheme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { useHistory } from "react-router-dom";
import { ICategory } from "./Interface/ICategory";
import useUserLogin from "../hooks/useUserLogin";
import SearchBar from "./SearchBar";
import CustomCartIcon from "./CustomCartIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 140,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  topCategories: {
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
    },
    display: "flex",
    width: "100%",
  },
  toolBar: {
    backgroundColor: "white",
    height: 45,
    minHeight: 10,
  },
  category: {
    padding: "10px 25px",
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
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "space-between",
    },
  },
  cursor: {
    cursor: "pointer",
  },
}));

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [placement, setPlacement] = useState<PopperPlacementType>();

  const handleMenu = (event: any) => {
    if (menuAnchorEl === null) {
      setMenuAnchorEl(event.currentTarget);
      setOpenUserMenu(true);
    } else {
      setOpenUserMenu(false);
      setMenuAnchorEl(null);
    }
  };

  const logOut = () => {
    dispatch(logoutUser());
    history.push("/");
  };

  const profile = () => {
    history.push("/profile");
  };

  const categoryList = useSelector((state: any) => {
    return state.categoryListReducer;
  });

  const { order } = useSelector((state: any) => {
    return state.activeOrder;
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

  return (
    <>
      <div className={classes.root}>
        <AppBar>
          <Toolbar className={classes.header}>
            <Typography variant="h6" className={classes.cursor}>
              <span onClick={() => history.push("/")}>COMMERCE</span>
            </Typography>
            {isMobile === false && <SearchBar />}
            {isMobile ? (
              <div>
                <IconButton
                  onClick={() => history.push("/cart")}
                  color="inherit"
                >
                  <CustomCartIcon
                    count={
                      order?.orderItems?.length ? order.orderItems.length : 0
                    }
                  />
                </IconButton>
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
                  startIcon={
                    <CustomCartIcon
                      count={
                        order?.orderItems?.length ? order.orderItems.length : 0
                      }
                    />
                  }
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
            <Popper
              open={openUserMenu}
              id={user?.name}
              anchorEl={menuAnchorEl}
              placement={placement}
              transition
              style={{
                marginTop: 5,
                backgroundColor: "#232f3e",
                maxWidth: 170,
                borderRadius: 5,
                zIndex: 10000,
              }}
            >
              <ClickAwayListener onClickAway={(event) => handleMenu(event)}>
                <span>
                  {isMobile === true && (
                    <>
                      <Button
                        color="secondary"
                        onClick={() => {
                          setMenuAnchorEl(null);
                          setOpenUserMenu(false);
                          history.push("/categories");
                        }}
                        fullWidth={true}
                        style={{ padding: "10px", minWidth: 170 }}
                      >
                        Categories
                      </Button>
                      <Button
                        color="secondary"
                        fullWidth={true}
                        style={{ padding: "10px", minWidth: 170 }}
                        onClick={() => {
                          setMenuAnchorEl(null);
                          setOpenUserMenu(false);
                          history.push("/cart");
                        }}
                      >
                        CART
                      </Button>
                      {!authenticated && (
                        <Button
                          color="secondary"
                          fullWidth={true}
                          style={{ padding: "10px", minWidth: 170 }}
                          onClick={() => {
                            setMenuAnchorEl(null);
                            setOpenUserMenu(false);
                            history.push("/login");
                          }}
                        >
                          LOGIN / SIGN UP
                        </Button>
                      )}
                    </>
                  )}
                  {authenticated === true && (
                    <>
                      <Button
                        color="secondary"
                        onClick={() => {
                          setMenuAnchorEl(null);
                          setOpenUserMenu(false);
                          profile();
                        }}
                        fullWidth={true}
                        style={{ padding: "10px", minWidth: 170 }}
                      >
                        Profile
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => {
                          setMenuAnchorEl(null);
                          setOpenUserMenu(false);
                          logOut();
                        }}
                        fullWidth={true}
                        style={{ padding: "10px", minWidth: 170 }}
                      >
                        Logout
                      </Button>
                    </>
                  )}
                </span>
              </ClickAwayListener>
            </Popper>
          </Toolbar>
          {isMobile === false ? (
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
                            zIndex: 10000,
                          }}
                        >
                          <ClickAwayListener
                            onClickAway={() => {
                              setSelectedCategory(null);
                              setAnchorEl(null);
                            }}
                          >
                            <span>
                              {category.subCategories.map((subCategory) => (
                                <Button
                                  color="secondary"
                                  id="a"
                                  key={subCategory._id}
                                  onClick={() => {
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
                            </span>
                          </ClickAwayListener>
                        </Popper>
                      </div>
                    ))
                  : null}
              </div>
            </Toolbar>
          ) : (
            <Toolbar>
              <SearchBar fullWidth={true} />
            </Toolbar>
          )}
        </AppBar>
      </div>
    </>
  );
};

export default Header;
