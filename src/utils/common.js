export const validateFields = (fieldsToValidate) => {
    console.log(fieldsToValidate)
    return fieldsToValidate.every((field) => (Object.values(field)[0] !== '' && Object.values(field)[0] !== undefined));
};