
export const getUniqueId = () => Math.random().toString(36).substring(2);

export const initialDropDown = { id: 0, value: '' };

export const modalLabel = (text: string | number) => `Are you sure, you want to cancel ${text} ?`
export const deleteLabel = (text: string) => `Are you sure, you want to delete ${text} ?`

export const DateFormatRegex = /^\d\d\d\d-(0?[1-9]|[1][0-2])-(0?[1-9]|[12][0-9]|3[01])\s\d\d:\d\d:\d\d$/
export const AirwayBillRegex = /[A-Za-z]{3}[\w]+/;
export const AirlineRegex = /^((?:[a-z][a-z]|[a-z][\d]|[\d][a-z])[a-z]?)([\d]{1,4}[a-z]?)$/gi;
export const NumericRegex = /^[0-9\s]*$/;
export const SWIFTRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
export const BankAccountRegex = /^(\d{3,12})$/;
export const IBANRegex = /^(?:(?:IT|SM)\d{2}[A-Z]\d{22}|CY\d{2}[A-Z]\d{23}|NL\d{2}[A-Z]{4}\d{10}|LV\d{2}[A-Z]{4}\d{13}|(?:BG|BH|GB|IE)\d{2}[A-Z]{4}\d{14}|GI\d{2}[A-Z]{4}\d{15}|RO\d{2}[A-Z]{4}\d{16}|KW\d{2}[A-Z]{4}\d{22}|MT\d{2}[A-Z]{4}\d{23}|NO\d{13}|(?:DK|FI|GL|FO)\d{16}|MK\d{17}|(?:AT|EE|KZ|LU|XK)\d{18}|(?:BA|HR|LI|CH|CR)\d{19}|(?:GE|DE|LT|ME|RS)\d{20}|IL\d{21}|(?:AD|CZ|ES|MD|SA)\d{22}|PT\d{23}|(?:BE|IS)\d{24}|(?:FR|MR|MC)\d{25}|(?:AL|DO|LB|PL)\d{26}|(?:AZ|HU)\d{27}|(?:GR|MU)\d{28})$/;
export const PhoneNumberRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
export const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const NumericWithDecimalRegex = /^[0-9][\.\d]*(,\d+)?$/;

export const numberOneRegex = /^1$/;
export const sampleProductNumberRegex = /^([0-9]|1[0-5])$/;

export const validationMessage = {
  INVALID_EMAIL_ADDRESS: 'You have entered an invalid e-mail address',
  INVALID_PHONE_NUMBER: 'You have entered an invalid phone number',
  INVALID_TEXT: 'You have entered an invalid text. Please add number only',
  INVALID_SWIFT: 'You have entered invalid SWIFT CODE',
  INVALID_IBAN: 'You have entered invalid IBAN',
  INVALID_BANK_ACCOUNT: 'You have entered invalid Bank Account',
  PHONE_NUMBER_LIMIT: 'Phone number must be 10 digit only',
  REQUIRED: 'This field is required.',
  ALPHABETS_TEXT: 'You have entered an invalid text. Please add alphabets only',
  REFERENCE_NUMBER_LENGTH: 'The reference number must be 70 characters long',
  ONE_BOX_TEXT: 'The number of box should be exactly 1',
  POSS_SAMPLE_PRODUCT_INVALID_TEXT: 'You have entered an invalid text. The maximum number of boxes should be 15',
}

export const formatPhoneNumber = (phoneNumber: string) => {
  // Remove all non-digit characters
  const cleaned = phoneNumber?.replace(/\D/g, '');

  // Check if the cleaned phone number is exactly 10 digits
  if (cleaned?.length === 10) {
    const match = cleaned?.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      // Prefix with the Saudi country code and format the number
      return `+966 ${match[1]} ${match[2]} ${match[3]}`;
    }
  }

  // Return the original phone number if it doesn't match the expected 10 digits
  return phoneNumber;
};

export const capitalizeFirstLetter = (input: string): string => {
  if (!input) return input; // Handle empty strings
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
};



