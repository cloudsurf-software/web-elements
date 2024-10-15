// src/components/ImageGallery/index.tsx

import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Button,
  Grid2,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Image from "next/image";
import { ImageGalleryProps } from "../../types";
import ImageViewer from "../ImageViewer";
// import ImageViewer from "../ImageViewer";
// import Grid2 from '@mui/material/Unstable_Grid2'; // Using Grid2 as you did

// export interface ImageGalleryProps {
//   images: {
//     imageUrl: string;
//     title: string;
//     description?: string;
//     width: number;
//     height: number;
//   }[];
//   showTitle?: boolean;
//   fullSizeViewerByDefault?: boolean;
//   showFullSizeButton?: boolean;
// }

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  showTitle = true,
  fullSizeViewerByDefault = false,
  showFullSizeButton = true,
}) => {
  const [open, setOpen] = useState(false); // Small modal visibility
  const [selectedImage, setSelectedImage] = useState<{
    imageUrl: string;
    title: string;
    description?: string;
    width: number;
    height: number;
  } | null>(null);
  const [isFullSize, setIsFullSize] = useState(false); // ImageViewer visibility

  const handleClickOpen = (image: typeof selectedImage) => {
    setSelectedImage(image);
    if (fullSizeViewerByDefault) {
      setIsFullSize(true);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleViewFullSizeImage = () => {
    setOpen(false);
    setIsFullSize(true);
  };

  const handleCloseImageViewer = (visible: boolean) => {
    setIsFullSize(visible);
    if (!visible) {
      setSelectedImage(null);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid2
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {images.map((image, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Box
              sx={{
                cursor: "pointer",
                borderRadius: "8px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                overflow: "hidden",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 300,
              }}
              onClick={() => handleClickOpen(image)}
            >
              <Image
                src={image.imageUrl}
                alt={image.title}
                width={image.width}
                height={image.height}
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority={index < 8}
                loading={index >= 8 ? "lazy" : undefined}
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
            {showTitle && (
              <Typography variant="h6" align="center" sx={{ mt: 1 }}>
                {image.title}
              </Typography>
            )}
          </Grid2>
        ))}
      </Grid2>

      {/* Small Modal Dialog */}
      {selectedImage && open && (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedImage.title}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 0,
                paddingBottom: `${
                  (selectedImage.height / selectedImage.width) * 100
                }%`,
              }}
            >
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
            {selectedImage.description && (
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedImage.description}
              </Typography>
            )}
            {showFullSizeButton && (
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, float: "right" }}
                onClick={handleViewFullSizeImage}
              >
                View Full Size
              </Button>
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Full-Size ImageViewer */}
      {selectedImage && isFullSize && (
        <ImageViewer
          isVisible={isFullSize}
          setIsVisible={handleCloseImageViewer}
          photoUrl={selectedImage.imageUrl}
          altText={selectedImage.title}
          title={selectedImage.title}
          description={selectedImage.description}
        />
      )}
    </Box>
  );
};

export default ImageGallery;
