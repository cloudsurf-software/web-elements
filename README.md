# @cloudsurf/web

![npm](https://img.shields.io/npm/v/@cloudsurf/web)

A collection of reusable React Next JS components for building forms, layouts, and image galleries with customizable options.

## Components

### 1. `ContactForm`

A fully customizable contact form that integrates with **EmailJS** for handling email submissions.

#### Props:

- **emailJsPublicKey** (string): Your EmailJS public key.
- **emailJsServiceId** (string): Your EmailJS service ID.
- **emailJsTemplateId** (string): Your EmailJS template ID for sending emails.
- **formValues** (FormValues): An object containing the user's input data, including name, company (optional), email, and description.
- **companyValues** (CompanyValues): An object containing the company-related data.
- **setFormValues** (React.Dispatch): A function to update the form values state.
- **templateParams** (TemplateParamsMapping): A mapping between form values and the EmailJS template parameters.
- **companyParams** (CompanyParamsMapping): A mapping between company values and the EmailJS template parameters.
- **buttonSx** (optional): Custom styles for the submit button.
- **containerSx** (optional): Custom styles for the form container.
- **onSubmit** (optional): A callback for handling form submission.
- **willSendEmailToThem** (optional): Whether to send an email to the user.
- **willSendEmailToMe** (optional): Whether to send an email to the company.
- **theirEmailJsTemplateId** (optional): EmailJS template ID for sending emails to the user.
- **templateParamsToThem** (optional): Template parameters mapping for the email to the user.

#### Example:

```tsx
ContactForm
  emailJsPublicKey="your-public-key"
  emailJsServiceId="your-service-id"
  emailJsTemplateId="your-template-id"
  formValues={formValues}
  setFormValues={setFormValues}
  templateParams={{
    name: 'name',
    email: 'email',
    description: 'description'
  }}
/>
```

### 2. `Layout`

A flexible layout component for handling navigation, responsiveness, and overall page structure.

#### Props:

- **startColor** (optional): Gradient start color for the layout background.
- **endColor** (optional): Gradient end color for the layout background.
- **backgroundColor** (optional): Background color of the layout.
- **children** (React.ReactNode): Content to be displayed within the layout.
- **isScrollable** (boolean): Whether the layout content should be scrollable.
- **isDrawerOpen** (boolean): Whether the navigation drawer is open.
- **handleToggleDrawer** (function): Function to toggle the navigation drawer.
- **navItems** (NavItem[]): Array of navigation items (icon, name, and route).
- **logoImg** (JSX.Element): The logo image element.
- **isTablet** (optional): Determines if the device is a tablet.
- **isPhone** (optional): Determines if the device is a phone.
- **borderRadius** (optional): Border radius for the layout.
- **primaryColor** (optional): Primary color of the layout.
- **primaryHoverColor** (optional): Hover color for navigation items.
- **companyName** (optional): Name of the company to be displayed.
- **showPoweredBy** (optional): Show the "Powered by" text in the footer.

#### Example:

```tsx
<Layout
  isScrollable={true}
  isDrawerOpen={false}
  handleToggleDrawer={handleToggleDrawer}
  navItems={navItems}
  logoImg={<YourLogo />}
>
  <YourPageContent />
</Layout>
```

### 3. `ImageGallery`

An image gallery component to display a collection of images with optional titles and descriptions.

#### Props:

- **images** (Array): Array of image objects with `imageUrl`, `title`, `description`, `width`, and `height`.
- **showTitle** (optional): Whether to show image titles.

#### Example:

```tsx
<ImageGallery
  images={[
    { imageUrl: "image1.jpg", title: "Image 1", width: 400, height: 300 },
    { imageUrl: "image2.jpg", title: "Image 2", width: 400, height: 300 },
  ]}
  showTitle={true}
/>
```

### 4. `ImageHeader`

A customizable image carousel header for websites, allowing for smooth transitions between multiple images. Provides static Image Header if only 1 image is in the imgUrls array.

#### Props:

- **title** (string): The main title for the header.
- **subtitle** (string): The subtitle for the header.
- **imgLogo** (optional): A logo JSX element to be displayed.
- **imgUrls** (optional): An array of image URLs for the carousel.
- **fontFamily** (optional): Font family for the title.
- **subtitleFontFamily** (optional): Font family for the subtitle.
- **textColor** (optional): Color of the title text.
- **subtitleTextColor** (optional): Color of the subtitle text.

#### Example:

```tsx
<ImageCarouselHeader
  title="Welcome to Our Site"
  subtitle="Explore our features"
  imgUrls={["header1.jpg", "header2.jpg", "header3.jpg"]}
  imgLogo={<YourLogoComponent size={10} />}
/>
```

## Required Peer Dependencies

This package relies on the following peer dependencies. Make sure they are installed in your project:

- @mui/material (version ^6.0.1)
- @mui/icons-material (version ^6.0.1)
- next (version 14.2.1)

You can install these peer dependencies by running:

`npm install @mui/material@^6.0.1 @mui/icons-material@^6.0.1 next@14.2.1`

Alternatively, you can add them to your package.json manually:

```
{
  "@mui/material": "^6.0.1",
  "@mui/icons-material": "^6.0.1",
  "next": "14.2.1"
}
```

Please check the version of these packages in the ./package.json to insure compatibility.

## Types

### FormValues

```tsx
export interface FormValues {
  name: string;
  company?: string;
  email: string;
  description: string;
  phone?: string;
}
```

### CompanyValues

```tsx
export interface CompanyValues {
  company: string;
  email: string;
}
```

### NavItem

```tsx
export interface NavItem {
  icon: JSX.Element;
  name: string;
  route: string;
}
```

## Installation

Install the package using npm:

```
npm i @cloudsurf/web@latest
```

## Usage

Import the components into your project and use them as shown in the examples above.

import { ContactForm, Layout, ImageGallery, ImageCarouselHeader } from '@cloudsurf/web';

## License

This project is licensed under the MIT License.
