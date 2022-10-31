import * as yup from 'yup';

export const formSchema = yup.object().shape({
  displayName: yup.string().required('First Name is required'),
});