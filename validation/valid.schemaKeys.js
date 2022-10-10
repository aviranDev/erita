const getSchemaKeys = (schema) => {
  const arrayOfKeys = Array.from(schema.keys());
  return arrayOfKeys
};

module.exports = getSchemaKeys;