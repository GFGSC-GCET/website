import * as yup from "yup";

const phoneRegExp = /^((\\+91-?)|0)?[0-9]{10}$/;

export const formSchema = yup.object().shape({
  displayName: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be less than 20 characters")
    .matches(/^[aA-zZ\s]+$/, "Name must be only alphabets")
    .trim(),

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

  year: yup.string().required("Year Required"),

  batch: yup.string().required("Batch Required"),

  bio: yup.string().required("Atleast tell something "),

  learning: yup.string().required("You must be learning something, eg:DSA"),

  skills: yup.string().required("Any Skill, eg:Designing"),

  gfg: yup
    .string()
    .matches(
        /^http(s?):\/\/auth.geeksforgeeks.org\/user\/[a-zA-Z0-9._-]+\/?$/i,
      "Invalid Github Profile URL"
    ).required("Geeks For Geeks Profile URL is required"),
  github: yup
    .string()
    .matches(
      /^(http(s?):\/\/)(www\.)?github\.([a-z])+\/([A-Za-z0-9._-]{1,})+\/?$/i,
      "Invalid Github Profile URL"
    ),

  linkedin: yup
    .string()
    .matches(
      /^(http(s)?:\/\/)([\w]+\.)?linkedin\.com\/(pub|in|profile)\//gm,
      "Invalid Linked In Profile URL"
    ),

  website: yup
    .string()
    .matches(
      /^(https?\:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})(\/[\w]*)*$/,
      "Invalid Linked In Profile URL"
    ),

  instagram: yup
    .string()
    .matches(
      /^(http(s?):\/\/)(www\.)?instagram\.([a-z])+\/([A-Za-z0-9._-]{1,})+\/?$/i,
      "Invalid Instagram Profile URL"
    ),
});

export const adminUsereditformSchema = yup.object().shape({
  displayName: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be less than 20 characters")
    .matches(/^[aA-zZ\s]+$/, "Name must be only alphabets")
    .trim(),

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

  year: yup.string().required("Year Required"),

  batch: yup.string().required("Batch Required"),

  bio: yup.string().required("Atleast tell something "),

  learning: yup.string().required("You must be learning something, eg:DSA"),

  skills: yup.string().required("Any Skill, eg:Designing"),

  github: yup
    .string()
    .matches(
      /^(http(s?):\/\/)(www\.)?github\.([a-z])+\/([A-Za-z0-9-]{1,})+\/?$/i,
      "Invalid Github Profile URL"
    ),

  linkedin: yup
    .string()
    .matches(
      /^(http(s)?:\/\/)([\w]+\.)?linkedin\.com\/(pub|in|profile)\//gm,
      "Invalid Linked In Profile URL"
    ),

  website: yup
    .string()
    .matches(
      /^(https?\:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})(\/[\w]*)*$/,
      "Invalid Linked In Profile URL"
    ),

  instagram: yup
    .string()
    .matches(
      /^(http(s?):\/\/)(www\.)?instagram\.([a-z])+\/([A-Za-z0-9._-]{1,})+\/?$/i,
      "Invalid Instagram Profile URL"
    ),
});

export const eventFormSchema = yup.object().shape({
  image: yup.string().required("Image is required"),
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .trim(),
  category: yup.string().required("Category is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(2, "Description must be at least 2 characters")
    .trim(),
  when: yup
    .string()
    .required("When is required")
    .min(2, "When must be at least 2 characters")
    .trim(),
  where: yup.string().trim(),
  online: yup.string().trim(),
  link: yup
    .string()
    .matches(
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
      "Invalid Link"
    )
    .trim(),
});


export const contactFormSchema = yup.object().shape({
  name: yup.string().required("Please Enter Your Name"),
  email:  yup.string().email()
    .required("Please enter your email")
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Enter a valid email"
    ),
  message: yup.string().required()
});
