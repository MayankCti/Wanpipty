import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
  mobile_number: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must be number")
    .min(10, "Mobile number cannot be less then 10 digits").max(10, "Mobile number can not be more then 10 digits")
    .required("Please enter your mobile number"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password cannot be less then 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
      "Strong passwords require at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
    ),
});

export const signUpSchema = Yup.object().shape({
  full_name: Yup.string().matches(/^[a-zA-Z]+(?:\s+[a-zA-Z]+)+$/, 'Please enter your full name (first and last name).').required("Please enter full name"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password cannot be less then 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
      "Strong passwords require at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
    ),
  mobile_number: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must be number")
    .min(10, "Mobile number cannot be less then 10 digits").max(10, "Mobile number can not be more then 10 digits")
    .required("Please enter your mobile number")
});

export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Please enter your current password")
    .min(8, "Current Password cannot be less then 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
      "Please enter a valid password"
    ),
  newPassword: Yup.string()
    .required("Please enter new password")
    .min(8, "New Password cannot be less then 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
      "Strong passwords require at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
    ),
  confirmPassword: Yup.string()
    .required("Please enter confirm password")
    .oneOf([Yup.ref("newPassword"), null], "Your password must match"),
});

export const forgotUserPassword = Yup.object().shape({
  mobile_number: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must be number")
    .min(10, "Mobile number cannot be less then 10 digits").max(10, "Mobile number can not be more then 10 digits")
    .required("Please enter your mobile number")
});

export const ContactUsSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
      "Please enter a valid email address"
    ),
  name: Yup.string().required("Please enter your name"),
  comment: Yup.string().required("Please enter Comment")
});

export const OtpSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^[0-9]+$/, "Otp must be number")
    .min(4, "Otp cannot be less then 4 digits")
    .required("Please enter your otp")
});

export const ForgotChangeSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password cannot be less then 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
      "Strong passwords require at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
    ),
  confirmPassword: Yup.string()
    .required("Please enter confirm password")
    .oneOf([Yup.ref("password"), null], "Your password must match"),
});