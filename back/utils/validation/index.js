const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validateField = ({ data, properties, required }) => {
  const schema = {
    type: "object",
    properties,
    required,
    additionalProperties: true,
  };
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) return [false, validate.errors];
  return [true, null];
};

module.exports = {
  validateField,
};
