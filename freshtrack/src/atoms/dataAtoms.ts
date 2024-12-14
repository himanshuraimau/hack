import { atom } from 'jotai';

export const signupFormDataAtom = atom({
  fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
});

export const loginFormDataAtom = atom({
  emailOrPhone: '',
  password: '',
});
