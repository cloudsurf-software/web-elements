import React from "react";
import { Box, colors, Grid2, Typography } from "@mui/material";
import { FeatureGridItem, FeaturesProps, SolutionBoxProps } from "../../types";

const SolutionBox = ({
  img,
  title,
  description,
  isTablet,
  isPhone,
  primaryColor = colors.grey[300],
  iconColor = "black",
}: SolutionBoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        mb: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: primaryColor,
          padding: 3,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        {img}
      </Box>
      <Typography
        variant="h5"
        fontSize={isTablet ? (isPhone ? "1.2em" : "1.5em") : "1.8em"}
        fontWeight="bold"
        mb={1}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        fontSize={isTablet ? (isPhone ? "1em" : "1.2em") : "1.2em"}
        color="text.secondary"
        maxWidth={300}
      >
        {description}
      </Typography>
    </Box>
  );
};

const Features = ({
  title,
  description,
  featuresTitle,
  isTablet,
  isPhone,
  textColor = "black",
  secondaryTextColor = "gray",
  fontFamily = "Roboto",
  secondaryFontFamily = "Roboto",
  features,
  primaryColor = colors.grey[300],
  iconColor = "black",
}: FeaturesProps) => {
  return (
    <Box sx={{ textAlign: "center", padding: 3, mb: 8 }}>
      <Box sx={{ marginBottom: 7 }}>
        <Typography
          variant="h2"
          fontSize={isTablet ? (isPhone ? "1.2em" : "2.2em") : "3em"}
          fontWeight="bold"
          color={textColor}
          fontFamily={fontFamily}
          pb={2}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          fontSize={isTablet ? (isPhone ? "1em" : "1.2em") : "1.5em"}
          color={secondaryTextColor}
          pb={2}
          fontFamily={secondaryFontFamily}
        >
          {description}
        </Typography>
      </Box>
      <Typography
        variant="h2"
        fontSize={isTablet ? (isPhone ? "1.2em" : "2.2em") : "3em"}
        fontWeight="bold"
        mb={3}
      >
        {featuresTitle}
      </Typography>

      <Grid2 container spacing={5} justifyContent="center">
        {features?.map((feature: FeatureGridItem, index: any) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <SolutionBox
              title={feature.title}
              description={feature.description}
              img={feature.icon}
              isPhone={isPhone}
              isTablet={isTablet}
              primaryColor={primaryColor}
              iconColor={iconColor}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Features;
