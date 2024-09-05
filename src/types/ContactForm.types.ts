export interface FormValues {
  name: string;
  company?: string;
  email: string;
  description: string;
  phone?: string;
}

export interface CompanyValues {
  company: string;
  email: string;
}

export type TemplateParamsMapping = {
  [key: string]: keyof FormValues;
};

export type CompanyParamsMapping = {
  [key: string]: keyof CompanyValues;
};

export interface ContactFormProps {
  emailJsPublicKey: string;
  emailJsServiceId: string;
  emailJsTemplateId: string;
  formValues: FormValues;
  companyValues: CompanyValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  templateParams: TemplateParamsMapping;
  companyParams: CompanyParamsMapping;
  buttonSx?: any;
  containerSx?: any;
  onSubmit?: any;
  willSendEmailToThem?: boolean;
  willSendEmailToMe?: boolean;
  theirEmailJsTemplateId?: string;
  templateParamsToThem?: TemplateParamsMapping;
  buttonColor?: string;
  buttonHoverColor?: string;
  buttonTextColor?: string;
}
