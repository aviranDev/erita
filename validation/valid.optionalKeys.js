/**
  * Prevent addinital keys's values from the request body input to be added.
  * The validation is Considered by the schema keys values structure. 
 * @param {*} inputKeys 
 * @param {*} schemaKeys 
 * @returns the invalid schema values optinal key.
  */
const optionalKeys = (inputKeys, schemaKeys) => {
  const invalidKey = inputKeys.filter(x => !schemaKeys.includes(x));
  if (invalidKey.length) {
    return { message: `Error from Schema: ${invalidKey} is invalid optinal key.` }
  }

  return null;
}

module.exports = optionalKeys;