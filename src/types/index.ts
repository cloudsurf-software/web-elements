// // types/@cloudsurf/web/index.d.ts

// // Declare the module with the types and interfaces
// declare module '@cloudsurf/web' {
//   import * as React from 'react';

export * from "./ContactFormTypes";
export * from "./LayoutTypes";

// export interface FormValues {
//   name: string;
//   company?: string;
//   email: string;
//   description: string;
//   phone?: string;
// }

// export interface CompanyValues {
//   company: string;
//   email: string;
// }

// export type TemplateParamsMapping = {
//   [key: string]: keyof FormValues;
// };

// export type CompanyParamsMapping = {
//   [key: string]: keyof CompanyValues;
// };

// export interface ContactFormProps {
//   emailJsPublicKey: string;
//   emailJsServiceId: string;
//   emailJsTemplateId: string;
//   formValues: FormValues;
//   companyValues: CompanyValues;
//   setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
//   templateParams: TemplateParamsMapping;
//   companyParams: CompanyParamsMapping;
//   buttonSx?: any;
//   containerSx?: any;
//   onSubmit?: any;
//   willSendEmailToThem?: boolean;
//   willSendEmailToMe?: boolean;
//   theirEmailJsTemplateId?: string;
//   templateParamsToThem?: TemplateParamsMapping;
// }

// export interface NavItem {
//   icon: JSX.Element;
//   name: string;
//   route: string;
// }

// Export the component
// export const ContactForm: React.FC<ContactFormProps>;
// }
