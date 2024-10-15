export interface ImageGalleryProps {
  images: {
    imageUrl: string;
    title: string;
    description?: string;
    width: number;
    height: number;
  }[];
  showTitle?: boolean;
  fullSizeViewerByDefault?: boolean;
  showFullSizeButton?: boolean;
}
