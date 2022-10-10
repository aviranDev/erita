const validateKeys = require('./valid.validateKeys');
const validateValues = require('./valid.validateValues');
const validateSchema = require('./valid.schema');

const validateHandler = (keys, schema) => {
  return async (req, res, next) => {
    /* validate Keys */
    const errorKeys = validateKeys(req.body, keys);
    if (errorKeys) {
      return res.status(404).send(errorKeys)
    }

    /* validate Values */
    const errorValues = validateValues(req.body, schema);
    if (errorValues) {
      return res.status(403).send(errorValues)
    }

    //Validate Schema
    const errorSchema = validateSchema(req.body, schema)
    if (errorSchema) {
      return res.status(400).send(errorSchema)
    }
    next();
  };
};

module.exports = validateHandler;