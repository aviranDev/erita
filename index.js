const handler = require('./validation/vaild.handler');
const getSchemaKeys = require('./validation/valid.schemaKeys');
const optionalKeys = require('./validation/valid.optionalKeys');

const buildMap = (schema) => {
  const newSchema = new Map(schema);
  return newSchema;
};

const erita = Object.create({

  schema: function (...asd) {
    let newSchema = [...asd];
    return newSchema;
  },

  validate: function (newSchema) {
    const map = buildMap(
      newSchema.map(object => {
        const options = ['key', 'optional'];
        const keys = Object.keys(object);
        const error = optionalKeys(keys, options);
        return error ? [object.key = 'Incorrect keyword: (key/optional).'] : [object.key, object.optional || {}];
      }),
    );
    const keys = getSchemaKeys(map);
    return handler(keys, map);
  },
});

module.exports = erita;