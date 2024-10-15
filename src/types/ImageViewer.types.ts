export interface ImageViewerProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  photoUrl: string;
  altText?: string;
  title?: string;
  description?: string;
}
