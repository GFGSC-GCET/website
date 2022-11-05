import * as yup from 'yup';

const phoneRegExp = /^((\\+91-?)|0)?[0-9]{10}$/;

export const formSchema = yup.object().shape({
  displayName: yup
    .string()
    .required("First Name is required"),

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
    .matches(
      phoneRegExp,
      "Enter a valid Number"
    )
    .required("WhatsApp Number is required"),
  
  year: yup
    .string()
    .required("Year Required"),
  
  batch: yup
    .string()
    .required("Batch Required"),

  bio: yup
    .string()
    .required("Atleast tell something "),

  learning: yup
    .string()
    .required("You must be learning something, eg:DSA"),

  skills: yup
    .string()
    .required("Any Skill, eg:Designing"),
  
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


export const adminUsereditformSchema = yup.object().shape({
  displayName: yup
    .string()
    .required("First Name is required"),

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
    .matches(
      phoneRegExp,
      "Enter a valid Number"
    )
    .required("WhatsApp Number is required"),
  
  year: yup
    .string()
    .required("Year Required"),
  
  batch: yup
    .string()
    .required("Batch Required"),

  bio: yup
    .string()
    .required("Atleast tell something "),

  learning: yup
    .string()
    .required("You must be learning something, eg:DSA"),

  skills: yup
    .string()
    .required("Any Skill, eg:Designing"),
  
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