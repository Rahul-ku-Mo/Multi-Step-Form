export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  streetAddress: string;
  city: string;
  region: string;
  postalCode: string;
};

export type AccountDetails = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  phoneNumber: string;
  securityQuestion: string;
  securityAnswer: string;
};

export type Preferences = {
  theme: string;
  language: string;
  timezone: string;
  currency: string;
  bio: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  newsletterFrequency: string;
};

export type FormData = PersonalInfo & AccountDetails & Preferences;

export interface FieldConfig {
    name: string;
    label: string;
    type: string;
    required: boolean;
    autoComplete?: string;
    options?: { value: string; label: string }[];
    validation?: {
      required?: string | boolean;
      pattern?: {
        value: RegExp;
        message: string;
      };
      maxLength?: {
        value: number;
        message: string;
      };
      minLength?: {
        value: number;
        message: string;
      };
      validate?: (value: string, formValues: any) => boolean | string;
    };
    placeholder?: string;
    colSpan?: string;
  }
