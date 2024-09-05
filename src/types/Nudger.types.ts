export interface NudgerBoxProps {
  img: any;
  title: string;
  description: string;
  link: string;
  backgroundColor?: string;
  backgroundHoverColor?: string;
  textColor?: string;
  primaryColor?: string;
  buttonIconColor?: string;
  fontFamily?: string;
  secondaryTextColor?: string;
  isTablet?: boolean;
  isPhone?: boolean;
}

export interface NudgerItem {
  title: string;
  description: string;
  imgComponent: JSX.Element;
  route: string;
}
export interface NudgerProps {
  items: NudgerItem[];
  isTablet?: boolean;
  isPhone?: boolean;
  fontFamily?: string;
  backgroundColor?: string;
  backgroundHoverColor?: string;
  textColor?: string;
  secondaryTextColor?: string;
  primaryColor?: string;
  buttonIconColor?: string;
  headerTitle?: string;
}
