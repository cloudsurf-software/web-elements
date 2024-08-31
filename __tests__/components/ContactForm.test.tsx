import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { FormValues, CompanyValues } from "../../src/types";

import ContactForm from "../../src/components/ContactForm";

const defaultProps = {
  emailJsPublicKey: "test_public_key",
  emailJsServiceId: "test_service_id",
  emailJsTemplateId: "test_template_id",
  formValues: {
    name: "",
    email: "",
    description: "",
    company: undefined, // Optional
    phone: undefined, // Optional
  },
  companyValues: {
    company: "Test Company",
    email: "test@company.com",
  },
  setFormValues: jest.fn(),
  templateParams: {
    user_name: "name" as keyof FormValues,
    user_email: "email" as keyof FormValues,
    user_message: "description" as keyof FormValues,
  },
  companyParams: {
    company_name: "company" as keyof CompanyValues,
    company_email: "email" as keyof CompanyValues,
  },
  onSubmit: jest.fn(),
};

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders the form fields", () => {
    render(<ContactForm {...defaultProps} />);

    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Description of the Project/i)
    ).toBeInTheDocument();
  });

  test("conditionally renders optional fields", () => {
    const { rerender } = render(<ContactForm {...defaultProps} />);

    // Check that company and phone fields are not rendered
    expect(screen.queryByLabelText(/Your Company/i)).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/Your Phone Number/i)
    ).not.toBeInTheDocument();

    // Render with company and phone fields
    rerender(
      <ContactForm
        {...defaultProps}
        formValues={{
          ...defaultProps.formValues,
          company: "",
          phone: "",
        }}
      />
    );

    // Check that company and phone fields are rendered
    expect(screen.getByLabelText(/Your Company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Phone Number/i)).toBeInTheDocument();
  });
  // test("handles form submission with valid data", async () => {
  //   render(<ContactForm {...defaultProps} />);

  //   // Fill out the form fields
  //   userEvent.type(screen.getByLabelText(/Your Name/i), "John Doe");
  //   userEvent.type(screen.getByLabelText(/Your Email/i), "john@example.com");
  //   userEvent.type(
  //     screen.getByLabelText(/Description of the Project/i),
  //     "A sample project description"
  //   );

  //   // Submit the form
  //   fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

  //   // Wait for the onSubmit to be called
  //   await waitFor(() => {
  //     expect(defaultProps.onSubmit).toHaveBeenCalled();
  //   });
  // });

  // test("calls setFormValues on input change", async () => {
  //   render(<ContactForm {...defaultProps} />);

  //   // Type into the "Your Name" field
  //   userEvent.type(screen.getByLabelText(/Your Name/i), "John Doe");

  //   // Assert that setFormValues was called with the final value of the name input
  //   expect(defaultProps.setFormValues).toHaveBeenLastCalledWith({
  //     ...defaultProps.formValues,
  //     name: "John Doe",
  //   });
  // });

  test("shows validation errors for invalid data", async () => {
    render(<ContactForm {...defaultProps} />);

    // Submit the form without filling required fields
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    // Check for validation error messages
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Description is required/i)
    ).toBeInTheDocument();

    // Ensure onSubmit was not called
    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
  });
});
