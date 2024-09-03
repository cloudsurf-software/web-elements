import React from "react";
import { useRouter } from "next/router";
import { AppBar, Box, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// import Logo from "../Logo";
import { TopBarProps } from "../../types";

function TopBar({
  toggleDrawer,
  drawerOpen,
  logoImg,
  isTablet = false,
}: TopBarProps) {
  const router = useRouter();

  const MobileNav = () => {
    return (
      <>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            mr: 1,
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => toggleDrawer(!drawerOpen)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box
          onClick={() => router.push("/")}
          sx={{
            display: "flex",
            mr: 1,
          }}
        >
          {logoImg && logoImg}
          {/* <Logo logoImg={logoImg} /> */}
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex" }}></Box>
      </>
    );
  };

  return (
    <AppBar position="fixed" elevation={0} sx={{ height: "55px" }}>
      <Toolbar
        disableGutters
        sx={{
          height: "55px !important",
          minHeight: "55px !important",
        }}
      >
        {isTablet ? (
          <MobileNav />
        ) : (
          <>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => toggleDrawer(!drawerOpen)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              onClick={() => router.push("/")}
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
              }}
            >
              {logoImg && logoImg}

              {/* <Logo logoImg={logoImg} /> */}
            </Box>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
            <Box></Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default TopBar;
