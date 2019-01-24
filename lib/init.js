"use strict";

const app = require("./../app.json");

Object.keys(app).forEach(key => {
  process.env[key] = app[key];
});

app.inputs = [];

process.argv.forEach((input, index) => {
  if (index > 1) {
    app.inputs.push(input);
  }
});

module.exports = app;
