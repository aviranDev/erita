const validateKeys = require('./valid.validateKeys');
const validateValues = require('./valid.validateValues');
const validateSchema = require('./valid.schema');

const validateHandler = (keys, schema) => {
  return async (req, res, next) => {
    /* validate Keys */
    const errorKeys = validateKeys(req.body, keys, schema);
    if (errorKeys) {
      return res.status(404).send({ message: errorKeys })
    }

    /* validate Values */
    const errorValues = validateValues(req.body, schema);
    if (errorValues) {
      return res.status(403).send({ message: errorValues })
    }

    //Validate Schema
    const errorSchema = validateSchema(req.body, schema)
    if (errorSchema) {
      return res.status(400).send({ message: errorSchema })
    }
    next();
  };
}

module.exports = validateHandler;