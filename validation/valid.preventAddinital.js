/**
  * Prevent addinital keys's values from the request body input to be added.
  * The validation is Considered by the schema keys values structure. 
 * @param {*} inputKeys 
 * @param {*} schemaKeys 
 * @returns error message with the invalid request body key.
  */
const preventAddinital = (inputKeys, schemaKeys) => {

  const invalidKey = inputKeys.filter(x => !schemaKeys.includes(x));
  if (invalidKey.length) {
    return `${invalidKey} is invalid key.`
  }

  return null;
}

module.exports = preventAddinital;