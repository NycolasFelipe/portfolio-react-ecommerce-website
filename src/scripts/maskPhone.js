import { filterDigits } from "./filterDigits.js";

export function maskPhone(value) {
  //@ts-ignore import filterDigits function
  let digits = filterDigits(11, value);
  let maskedPhone = "";
  
  for (let i = 0; i < digits.length; i++) {
    switch (i) {
      case 0: 
        maskedPhone += "(";
        break;
      case 2:
        maskedPhone += ") ";
        break;
      case 6:
        maskedPhone += "-";
        break;
    }
    maskedPhone += digits[i];

    if (i === 10) {
      maskedPhone = maskedPhone.replace("-", "");
      maskedPhone = maskedPhone.replace(new RegExp(`^(.{${10}})(.*)`), `$1${"-"}$2`);
    }
  }
  
  return maskedPhone;
}