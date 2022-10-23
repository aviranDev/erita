const differentKeys = require('./valid.diffrenetKeys');
const preventAddinital = require('./valid.preventAddinital');

/**
 * Validate keys of request body input client form.
 * The validation is Considered by the schema keys values structure. 
 * @param {*} input 
 * @param {*} schemaKeys 
 * @returns errors: differentKeys/preventAddinital or null
 */
const validateKeys = (input, schemaKeys, schema) => {
  const inputKeys = Object.keys(input);

  let required = new Map();

  for (const [key, value] of schema.entries()) {
    if (value.required) {
      required.set(key, value.required);
    }
  }

  const diffrenetError = differentKeys(inputKeys, schemaKeys, required);
  if (diffrenetError) {
    return diffrenetError;
  }

  const addedKeysError = preventAddinital(inputKeys, schemaKeys, required);
  if (addedKeysError) {
    return addedKeysError;
  }

  return null;
};


module.exports = validateKeys;