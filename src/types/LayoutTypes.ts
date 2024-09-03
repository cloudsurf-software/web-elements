export interface NavItem {
  icon: JSX.Element;
  name: string;
  route: string;
}

export interface LayoutProps {
  startColor?: string;
  endColor?: string;
  backgroundColor?: string;
  children: React.ReactNode;
  isScrollable: boolean;
  isDrawerOpen: boolean;
  handleToggleDrawer: any;
  navItems: NavItem[];
  logoImg: JSX.Element;
  isTablet?: boolean;
  isPhone?: boolean;
  borderRadius?: string;
  primaryColor?: string;
  primaryHoverColor?: string;
}

export interface NavDrawerProps {
  toggleDrawer: any;
  drawerOpen: boolean;
  isTablet: boolean;
  isPhone: boolean;
  navItems: NavItem[];
  primaryColor?: string;
  primaryHoverColor?: string;
}

// export interface DrawerListProps {
//   navItems: NavItem[];
//   toggleDrawer: any;
//   isTablet: boolean;
//   isPhone: boolean;
//   primaryColor?: string;
//   primaryHoverColor?: string;
// }

export interface StyledDrawerProps {
  open: boolean;
}

export interface TopBarProps {
  toggleDrawer: any;
  drawerOpen: boolean;
  logoImg: JSX.Element;
  isTablet?: boolean;
}

export interface FooterProps {
  logoImg: JSX.Element;
  isDrawerOpen: boolean;
  backgroundColor?: string;
  textColor?: string;
  isTablet?: boolean;
  isPhone?: boolean;
  borderRadius?: string;
}
