// @cloudsurf__web.d.ts

declare module "@cloudsurf/web" {
  // Import the types from their central location
  import {
    FormValues,
    ContactFormProps,
    FormErrors,
    TemplateParamsMapping,
    CompanyValues,
    CompanyParamsMapping,
  } from "@src/types"; // Adjust the path as necessary

  // Re-export these types so they are available when the module is imported
  export {
    FormValues,
    ContactFormProps,
    FormErrors,
    TemplateParamsMapping,
    CompanyValues,
    CompanyParamsMapping,
  };

  // Export the ContactForm component
  export const ContactForm: React.FC<ContactFormProps>;
}
