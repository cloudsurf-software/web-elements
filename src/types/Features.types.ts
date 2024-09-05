export interface SolutionBoxProps {
  img: React.ReactNode;
  title: string;
  description: string;
  isTablet?: boolean;
  isPhone?: boolean;
  primaryColor?: string;
  iconColor?: string;
}

export interface FeatureGridItem {
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface FeaturesProps {
  title: string;
  description: string;
  featuresTitle: string;
  isTablet: boolean;
  isPhone: boolean;
  textColor?: string;
  secondaryTextColor?: string;
  fontFamily?: string;
  secondaryFontFamily?: string;
  features: FeatureGridItem[];
  primaryColor?: string;
  iconColor?: string;
}
