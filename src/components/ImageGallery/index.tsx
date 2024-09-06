import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Grid2,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Image from "next/image";
import { ImageGalleryProps } from "../../types";

const ImageGallery = ({ images, showTitle = true }: ImageGalleryProps) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    imageUrl: string;
    title: string;
    description?: string;
    width: number;
    height: number;
  } | null>(null);

  const handleClickOpen = (image: typeof selectedImage) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
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
                // fill
                // style={{ objectFit: "cover", objectPosition: "center center" }}
                priority={index < 8}
                loading={index >= 8 ? "lazy" : undefined}
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                  width: "100%", // Full width
                  height: "auto", // Automatically adjust height to maintain aspect ratio
                }}
                // layout="responsive"
                // objectFit="cover"
                // objectPosition="center center"
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

      {selectedImage && (
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
                // layout="fill"
                // objectFit="contain"
              />
            </Box>
            {selectedImage.description && (
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedImage.description}
              </Typography>
            )}
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default ImageGallery;
