import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";

const Navbar = () => {
  const { user, handleLogout } = useGlobalContext();

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            fontSize={24}
            fontWeight="bold"
            sx={{ flexGrow: 1, color: "#FFF" }}
          >
            Dobbs Ads Assignment
          </Typography>
          {!user?.user ? (
            <Link to="../auth" className="link">
              <Button color="secondary" variant="contained">
                Login
              </Button>
            </Link>
          ) : (
            <>
              <NavLink to="../myProfile" className="nav-link">
                Profile
              </NavLink>
              <Typography className="Typography logout" onClick={handleLogout}>
                Logout
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
