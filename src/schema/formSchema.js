import * as yup from 'yup';

const phoneRegExp = /^((\\+91-?)|0)?[0-9]{10}$/;

export const formSchema = yup.object().shape({
  displayName: yup.string().required("First Name is required"),
  collegeEmail: yup
    .string()
    .email()
    .required("College Email is required")
    .matches(
      /@galgotiacollege.edu$/,
      "use your college email ( @galgotiacollege.edu )"
    ),
  whatsappNumber: yup
    .string()
    .matches(phoneRegExp, "Enter a valid Number")
    .required("WhatsApp Number is required"),
});