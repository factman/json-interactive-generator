"use strict";

const app = require("./lib/init");
const input = require("./lib/dataStream");
const readline = require('readline');
const fs = require("fs");

const reader = readline.createInterface(
  { 
    input: process.stdin,
    output: process.stdout,
  });

const data = {};

const generate = () => {
  reader.question("Property Name:type? ", prop => {
      const dataType = prop
        .split(":")[1] || "string";
      const props = prop.split(":")[0]
        .split(".");
      reader.question(`${dataType} "${props[props.length - 1]}" Value? `, value => {
          data[props[0]] = input
            .parseValue(dataType, props, value);
          reader.question(`Continue? (yes) `, ans => {
            if (ans == "no") {
              const output = JSON.stringify(data);
              console.log(output);
              reader.question(`Save to File? (yes) `, res => {
                if (res == "no") {
                  process.exit(0);
                } else {
                  reader.question(`Filename: `, name => {
                    fs.writeFile(`output/${name}.json`, output, (err) => {
                      if (err) throw err;
                      console.log(`The file has been saved as "${name}.json"`);
                      process.exit(0);
                    });
                  });
                }
              });
            } else {
              generate();
            }
          });
        });
    });
};

generate();
