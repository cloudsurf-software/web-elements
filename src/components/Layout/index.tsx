import React, { ReactNode, useEffect } from "react";
import styled from "@emotion/styled";
import Footer from "../Footer";
import TopBar from "../Nav/TopBar";
import { colors } from "@mui/material";
import NavDrawer from "../Nav/NavDrawer";
import { LayoutProps, NavItem } from "../../types";

const MainContainer = styled.div<{
  backgroundColor: string;
  isScrollable?: boolean;
  open?: boolean;
  isTablet?: boolean;
  isPhone?: boolean;
  borderRadius?: string;
}>`
  padding: 20px 16px 40px 16px;
  height: 100%;
  min-height: 100vh;
  transition: margin-left 0.3s;
  margin-top: 55px;
  margin-bottom: 210px; // distance including footer
  border-radius: ${(props) => props.borderRadius};
  margin-left: ${(props) => (props.open && !props.isTablet ? "250px" : "0")};
  background-color: ${(props) => props.backgroundColor};
`;

export default function Layout({
  bgColorLevel1,
  bgColorLevel2,
  bgColorNav,
  textColor,
  secondaryTextColor,
  primaryColor = colors.indigo[700],
  primaryHoverColor = colors.indigo[700],
  textColorOnPrimary = colors.grey[100],
  logoImg,
  children,
  isScrollable,
  isDrawerOpen,
  handleToggleDrawer,
  navItems,
  extraNavItems = [],
  isTablet = false,
  isPhone = false,
  borderRadius = "0px",
  companyName = "CloudSurf Software",
  showPoweredBy = true,
}: LayoutProps) {
  const toggleDrawer = (open: boolean) => {
    console.log("toggleDrawer start", open, "before:", isDrawerOpen);
    handleToggleDrawer(open);
    console.log("toggleDrawer finish", open, "before:", isDrawerOpen);
  };
  return (
    <main
      style={
        isScrollable
          ? {
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              backgroundColor: bgColorLevel1,
              padding: 10,
              position: "relative", // Needed for absolute positioning of the footer
              width: "100%",
            }
          : {
              height: "100vh",
              overflow: "hidden",
              backgroundColor: bgColorLevel1,
              padding: 10,
              position: "relative", // Needed for absolute positioning of the footer
              width: "100%",
            }
      }
    >
      <TopBar
        toggleDrawer={toggleDrawer}
        drawerOpen={isDrawerOpen}
        logoImg={logoImg}
        isTablet={isTablet}
        backgroundColor={bgColorNav}
      />

      <NavDrawer
        toggleDrawer={toggleDrawer}
        drawerOpen={isDrawerOpen}
        isTablet={isTablet}
        isPhone={isPhone}
        navItems={navItems}
        primaryColor={primaryColor}
        primaryHoverColor={primaryHoverColor}
        iconComponent={logoImg}
        extraNavItems={extraNavItems}
        backgroundColor={bgColorNav}
        textColor={textColor}
        selectedTextColor={textColorOnPrimary}
        iconColor={secondaryTextColor}
      />
      <MainContainer
        backgroundColor={bgColorLevel2}
        open={isDrawerOpen}
        isScrollable={isScrollable}
        isTablet={isTablet}
        isPhone={isPhone}
        borderRadius={borderRadius}
      >
        {children}
      </MainContainer>
      <Footer
        logoImg={logoImg}
        isDrawerOpen={isDrawerOpen}
        isPhone={isPhone}
        isTablet={isTablet}
        borderRadius={borderRadius}
        companyName={companyName}
        showPoweredBy={showPoweredBy}
        backgroundColor={bgColorLevel2}
        textColor={textColor}
      />
    </main>
  );
}
