/**
  * Find diffrences keys properties between two objects,
  * Schema keys values and input keys values.
  * If there are diffrences, return the first diffrenct value from the request body client input.
  * The validation is Considered by the schema keys values structure. 
  * @param {*} inputKeys 
  * @param {*} schemaKeys 
  * @returns: the first key's value from the schema that missing at the request body.
  */
const diffrenetKeys = (inputKeys, schemaKeys) => {
  let findDiffrenetKeys = schemaKeys.filter(x => !inputKeys.includes(x));
  if (findDiffrenetKeys.length) {
    return `${findDiffrenetKeys[0]} valid key is required`;
  }

  return null
}

module.exports = diffrenetKeys;