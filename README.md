# erita

 ![NPM version](https://img.shields.io/npm/v/erita)
  [![NPM version](https://img.shields.io/npm/v/erita)](https://www.npmjs.com/package/erita)

erita is a node.js middleware for handling validations on request objects.
It works as a request level validation for requset body keys and values.
It provides the easy way to create a schema for handling validation on a route as a middleware.

erita provides two utilits

1. schema, which holds the structure of the request body objects.
2. validate, which is hold the schema itslef.

**NOTE**: erita works only in express.js library package.

## Installation

```sh
npm install --save erita
```

## Usage

erita adds a `schema` object and a `middleware function` to the `route` for post requests. The `schema` object contains the keys and the values of the text fields of the form, the `vlaidate function middleware`
contains the schema object and that become a validation middleware for post requests.

The schema is built has an object that contain key and value and have another key for optional requires validation:

Basic usage example:

```javascript
const express = require('express');
const erita  = require('erita');
const app = express();
app.use(express.json());

const schema = erita.schema(
  {key: 'firstName'},
  {key: 'lastName', optional: {required: true}},
  {key: 'email', optional: {regex: /^[\w.+\-]+@gmail\.com$/, ms: 'invalid email', required: true}},
  {key: 'password', optional: {min: 6, max: 150, required: true}},
);

app.post('/signup', erita.validate(schema), function (req, res, next) {
  //the controllers
});
```

## SCHEMA

### Schema information

Each file contains the following information:

Key | Description | Note
--- | --- | ---
`key` | Field key name specified in the form |

### `Schema optional`

The schema accepts an optional object, that can has propertys, which hold additinal validation requires.

By default, erita acceps only the specific key names in this documentation, and any changes of these names will case an error schema.

The following are the options that can be passed to irita schema.

Key | Description | Note
--- | --- | ---
`optional` | The object that hold the optional addintion keys |
`type` | Represents the Field value type | string/number/boolean
`min` | Represents the minimum length | accept only type of numbers
`max` | Represents the maximum length | accept only type of numbers
`regex` | Represents the regular expression requirement. |
`ms` | can be added only with regex fileds and represent a custom message for error. | only with regex
`required` | Represents the required value of a key. | set as a boolean true

## Error handling

When encountering an error, erita will delegate the error to Express.
