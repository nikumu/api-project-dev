const { Validator } = require('jsonschema');

const v = new Validator();

const schemaValidator = (schema) => (req, res, next) => {
    const result = v.validate(req.body, schema);
    if (!result.valid) {
        const messageError = [];

        for (const item of result.errors) {
            messageError.push(item.message);
        }

        return res.status(401).send({
            schemaError: messageError,
        });
    }
    next();
};

module.exports = schemaValidator;