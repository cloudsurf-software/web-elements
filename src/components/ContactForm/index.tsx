import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { ChangeEvent, FormEvent } from "react";
import Alert from "@mui/material/Alert";
import * as emailjs from "@emailjs/browser";

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

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  description?: string;
  phone?: string;
}

type TemplateParamsMapping = {
  [key: string]: keyof FormValues;
};

type CompanyParamsMapping = {
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
}

const ContactForm = (props: ContactFormProps) => {
  const {
    emailJsServiceId,
    emailJsTemplateId,
    formValues,
    companyValues,
    setFormValues,
    templateParams,
    templateParamsToThem,
    companyParams,
    willSendEmailToThem = false,
    willSendEmailToMe = true,
    theirEmailJsTemplateId,
    emailJsPublicKey,
  } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    emailjs.init({
      publicKey: emailJsPublicKey,
      // Do not allow headless browsers
      blockHeadless: true,
      limitRate: {
        // Set the limit rate for the application
        id: "app",
        // Allow 1 request per 10s
        throttle: 10000,
      },
    });
  }, []);

  const mapTemplateParams = (
    formValues: FormValues,
    templateParams: TemplateParamsMapping
  ): { [key: string]: string } => {
    return Object.keys(templateParams).reduce((acc, key) => {
      const value = formValues[templateParams[key]] || ""; // Default to empty string
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: string });
  };

  const mapCompanyParams = (
    companyValues: CompanyValues,
    companyParams: CompanyParamsMapping
  ): { [key: string]: string } => {
    return Object.keys(companyParams).reduce((acc, key) => {
      acc[key] = companyValues[companyParams[key]];
      return acc;
    }, {} as { [key: string]: string });
  };

  const sendEmailToMe = async () => {
    const templateParamsInput = mapTemplateParams(formValues, templateParams);
    const companyParamsInput = mapCompanyParams(companyValues, companyParams);

    const templateParamsFinal = {
      ...templateParamsInput,
      ...companyParamsInput,
    };

    console.log(
      "->sendEmailToMe templateParamsFinal",
      templateParamsFinal,
      emailJsTemplateId
    );
    // return;
    try {
      const response = await emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        templateParamsFinal
      );
      console.log("SUCCESS!", response.status, response.text);
    } catch (err) {
      console.log("FAILED...", err);
    }
  };

  const sendEmailToThem = async () => {
    if (
      !willSendEmailToThem ||
      !emailJsServiceId ||
      !theirEmailJsTemplateId ||
      !templateParamsToThem
    )
      return;

    const templateParamsInput = mapTemplateParams(
      formValues,
      templateParamsToThem
    );
    console.log(
      "->sendEmailToThem templateParamsInput",
      templateParamsInput,
      theirEmailJsTemplateId
    );

    // return;
    try {
      const response = await emailjs.send(
        emailJsServiceId,
        theirEmailJsTemplateId,
        templateParamsInput
      );
      console.log("SUCCESS!", response.status, response.text);
    } catch (err) {
      console.log("FAILED...", err);
    }
  };

  const validate = () => {
    let tempErrors: FormErrors = {};
    tempErrors.email = formValues.email ? "" : "Email is required";
    tempErrors.description = formValues.description
      ? ""
      : "Description is required";
    if (formValues.phone && !/^[0-9]{10}$/.test(formValues.phone)) {
      tempErrors.phone = "Phone number must be 10 digits";
    }
    if (
      formValues.email &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)
    ) {
      tempErrors.email = "Email is not valid";
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      setIsLoading(!isLoading);

      try {
        if (willSendEmailToMe) {
          await sendEmailToMe();
        }
        if (willSendEmailToThem) {
          await sendEmailToThem();
        }
        if (props.onSubmit) {
          await props.onSubmit();
        }
      } catch (err) {
        console.error("ERROR: Something went wrong when trying to send Email");
        console.error(err);
      }

      setIsLoading(false);
      setShowSuccessMessage(true);

      setFormValues({
        name: "",
        company: formValues.company === undefined ? undefined : "",
        email: "",
        description: "",
        phone: formValues.phone === undefined ? undefined : "",
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleClose = () => {
    setShowSuccessMessage(false);
  };

  return (
    <Container maxWidth="sm" sx={{ ...props.containerSx }}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          id="name"
          label="Your Name"
          name="name"
          autoComplete="name"
          autoFocus
          variant="outlined"
          value={formValues.name}
          onChange={handleChange}
        />
        {formValues.company !== undefined && (
          <TextField
            margin="normal"
            fullWidth
            id="company"
            label="Your Company"
            name="company"
            autoComplete="company"
            variant="outlined"
            value={formValues.company}
            onChange={handleChange}
          />
        )}
        {formValues.phone !== undefined && (
          <TextField
            margin="normal"
            fullWidth
            id="phone"
            label="Your Phone Number"
            name="phone"
            autoComplete="phone"
            variant="outlined"
            value={formValues.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            inputProps={{
              maxLength: 10,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
          />
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Your Email"
          name="email"
          autoComplete="email"
          variant="outlined"
          value={formValues.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description of the Project"
          name="description"
          multiline
          rows={4}
          autoComplete="description"
          variant="outlined"
          value={formValues.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#30a3e7",
            color: "#fafafa",
            "&:hover": { backgroundColor: "#0a7dc1" },
          }}
        >
          {isLoading ? (
            <CircularProgress size="1.5rem" color="info" />
          ) : (
            "Submit"
          )}
        </Button>
      </Box>
      {showSuccessMessage && (
        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            You've successfully submitted the form!
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default ContactForm;
