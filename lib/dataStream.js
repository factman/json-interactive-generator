"use strict";

const assignData = (props, val) => {
  let data = val;
  let x;
  let i = props.length - 1;
  while(i >= 1) {
    x = Object
      .assign({}, { [props[i]]: data });
    data = x;
    i--;
  }
  return data;
};

module.exports = {
  parseValue: (type, props, val) => {
    switch(type) {
      case 'string':
        if (props.length < 2) {
          return val;
        } else {
          return assignData(props, val);
        }
        break;
      default:
        if (props.length < 2) {
          return JSON.parse(val);
        } else {
          return assignData(props, JSON.parse(val));
        }
    }
  },
};
