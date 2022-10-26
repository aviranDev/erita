import optionalKeys from './valid.optionalKeys.js';
import objectType from './valid.objectType.js';

const validateSchema = (data, schema) => {
  const map = new Map(Object.entries(data));

  for (const [key, value] of schema) {
    let inputKey = map.has(key);
    let inputValue = map.get(key);

    /* determined optinal keys */
    const schemaValueKeys = Object.keys(value);

    const valuesOptionalKeys = ['type', 'min', 'max', 'regex', 'ms', 'required'];
    const addedKeysError = optionalKeys(schemaValueKeys, valuesOptionalKeys);
    if (addedKeysError) {
      return addedKeysError;
    };

    /* determined types values */
    const validTypes = ['string', 'number', 'boolean'];
    const schemaTypes = [];
    value.type && schemaTypes.push(value.type)
    const invalidTypes = optionalKeys(schemaTypes, validTypes);
    if (invalidTypes) {
      return invalidTypes;
    };

    const minimum = objectType(value.min, 'Number');
    if (value.min && !minimum) return `Minimum length must be type of number`;

    const maximum = objectType(value.max, 'Number');
    if (value.max && !maximum) return `Maximum length must be type of number`;

    const message = objectType(value.ms, 'String');
    if (value.ms && !message) return `Message must be type of string`;

    if (value.regex && typeof value.regex !== 'object') {
      return `regex must be type of object`;
    };

    if (!value.regex && value.ms) {
      return 'Message is allowd only with regular expression condition.'
    }

    //Error length -> Smaller then minimum
    if ((inputKey && typeof inputValue === 'string' && inputValue.trim().length < value.min)) {
      return `${key} must be at least ${value.min} characters long.`
    }

    if ((inputKey && typeof inputValue === 'number' && inputValue.length < value.min)) {
      return `${key} must be at least ${value.min} digits.`
    }

    //Error length -> Bigger then maximum
    if ((inputKey && typeof inputValue === 'string' && (inputValue.trim().length > value.max))) {
      return `${key} must no more then ${value.max} characters long.`
    }

    if ((inputKey && typeof inputValue === 'number' && inputValue.length > value.max)) {
      return `${key} must no more then ${value.max} digits.`
    }

    //Error Messages 
    if ((inputKey && value.regex && !value.regex.test(inputValue))) {
      return `Invalid ${key}. ${value.ms ? value.ms : ""}`
    };

    //Error types
    if (inputKey && value.type && typeof inputValue !== value.type) {
      return `Invalid ${key} value type.`
    }
  }
  return null;
};

export default validateSchema;