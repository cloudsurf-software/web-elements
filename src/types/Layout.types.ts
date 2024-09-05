export interface NavItem {
  icon: JSX.Element;
  name: string;
  route: string;
}

export interface LayoutProps {
  bgColorLevel1: string;
  bgColorLevel2: string;
  bgColorNav: string;
  textColor: string;
  secondaryTextColor: string;
  // startColor?: string;
  // endColor?: string;
  backgroundColor?: string;
  textColorOnPrimary?: string;
  navBackgroundColor?: string;
  navTextColor?: string;
  navIconColor?: string;
  children: React.ReactNode;
  isScrollable: boolean;
  isDrawerOpen: boolean;
  handleToggleDrawer: any;
  navItems: NavItem[];
  extraNavItems?: JSX.Element[];
  logoImg: JSX.Element;
  isTablet?: boolean;
  isPhone?: boolean;
  borderRadius?: string;
  primaryColor?: string;
  primaryHoverColor?: string;
  companyName?: string;
  showPoweredBy?: boolean;
}

export interface NavDrawerProps {
  toggleDrawer: any;
  drawerOpen: boolean;
  isTablet: boolean;
  isPhone: boolean;
  navItems: NavItem[];
  extraNavItems?: JSX.Element[];
  primaryColor?: string;
  primaryHoverColor?: string;
  iconComponent?: any;
  backgroundColor?: string;
  iconColor?: string;
  textColor?: string;
  selectedTextColor?: string;
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
  backgroundColor?: string;
}

export interface FooterProps {
  logoImg: JSX.Element;
  isDrawerOpen: boolean;
  backgroundColor?: string;
  textColor?: string;
  isTablet?: boolean;
  isPhone?: boolean;
  borderRadius?: string;
  companyName?: string;
  showPoweredBy?: boolean;
}
