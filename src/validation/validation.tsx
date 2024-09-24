import { BankAccountRegex, EmailRegex, IBANRegex, numberOneRegex, NumericRegex, NumericWithDecimalRegex, PhoneNumberRegex, sampleProductNumberRegex, SWIFTRegex, validationMessage } from "../common/common";

export const requiredValidation = {
    required: true,
    message: validationMessage.REQUIRED
}

export const numericValidation = {
    pattern: NumericRegex,
    message: validationMessage.INVALID_TEXT
}

export const phoneNumberValidation = [
    {
        pattern: PhoneNumberRegex,
        message: validationMessage.INVALID_PHONE_NUMBER
    },
]
export const numericDecimalValidation = {
    pattern: NumericWithDecimalRegex,
    message: validationMessage.INVALID_TEXT
}
export const emailValidation = [
    requiredValidation,
    {
        pattern: EmailRegex,
        message: validationMessage.INVALID_EMAIL_ADDRESS
    },
]

export const postalValidation = [
    requiredValidation,
    numericValidation,
]

export const bankAccountValidation = [
    requiredValidation,
    {
        pattern: BankAccountRegex,
        message: validationMessage.INVALID_BANK_ACCOUNT
    },
]

export const bankSWIFTCodeValidation = [
    requiredValidation,
    {
        pattern: SWIFTRegex,
        message: validationMessage.INVALID_SWIFT
    },
]
export const bankIBANCodeValidation = [
    requiredValidation,
    {
        pattern: IBANRegex,
        message: validationMessage.INVALID_IBAN
    },
]
export const referenceLengthValidation = {
    max: 70,
    message: validationMessage.REFERENCE_NUMBER_LENGTH
}


export const numericFieldValidation = [
    numericValidation,
]

export const numberOneValidation =  {
    pattern: numberOneRegex,
    message: validationMessage.ONE_BOX_TEXT
}

export const samplesProductValidation =  {
    pattern: sampleProductNumberRegex,
    message: validationMessage.POSS_SAMPLE_PRODUCT_INVALID_TEXT
}
