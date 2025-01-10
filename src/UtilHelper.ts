export const toJson = (arg: object | any) => {
  return arg ? JSON.parse(JSON.stringify(arg)) : null;
};

export const copy = (arg: object | any) => {
  return arg ? JSON.parse(JSON.stringify(arg)) : null;
};

export const createRandomCode = async (length: number = 6) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const isEmptyObject = (obj: object) => {
  if (obj == undefined || obj == null) {
    return false;
  }
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const isEmptyArray = (arr: Array<any>) => {
  if (arr == undefined || arr == null) {
    return false;
  }
  return Array.isArray(arr) && !arr.length;
};

export const isValidDateObject = (date: Date) => {
  if (date == undefined || date == null) {
    return false;
  }
  return new Date(date).toString() !== "Invalid Date";
};

export const isValidDateString = (date: string) => {
  if (date == undefined || date == null || date == "") {
    return false;
  }
  return !isNaN(Date.parse(date));
};

export const isDate = (date: Date | string) => {
  if (date == undefined || date == null || date == "") {
    return false;
  }
  if (typeof date === "string") {
    return !isNaN(Date.parse(date));
  } else {
    return new Date(date).toString() !== "Invalid Date";
  }
};

export const isNumber = (num: number | string | any) => {
  if (num == undefined || num == null || num == "") {
    return false;
  }
  return isNaN(num) ? false : true;
};

export const isObject = (obj: object) => {
  if (obj == undefined || obj == null) {
    return false;
  }
  return typeof obj === "object" && !Array.isArray(obj) && obj !== null
    ? true
    : false;
};

export const isArray = (arr: Array<any>) => {
  if (arr == undefined || arr == null) {
    return false;
  }
  return typeof arr === "object" && Array.isArray(arr) && arr !== null
    ? true
    : false;
};
