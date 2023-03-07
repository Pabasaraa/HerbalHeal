import CryptoJS from "crypto-js";
import validator from "validator";

class PaymentValidation {
  constructor(payment) {
    this.userId = payment.userId;
    this.cardNumber = payment.cardNumber;
    this.lastCardDigits = getLastDigits(payment.cardNumber);
    this.cardHolder = payment.cardHolder;
    this.expirationDate = payment.expirationDate;
    this.securityCode = payment.securityCode;
    this.billingAddress = payment.billingAddress;
  }

  async validate() {
    if (
      !this.userId ||
      !this.cardNumber ||
      !this.cardHolder ||
      !this.expirationDate ||
      !this.securityCode ||
      !this.billingAddress
    ) {
      throw new Error("Some fields are missing!");
    }

    if (!validator.isCreditCard(this.cardNumber)) {
      throw new Error("Card number is not valid!");
    }

    if (this.securityCode.trim().length !== 3) {
      throw new Error("Security code must be 3 digits long!");
    }
  }

  encrypCardNumber() {
    try {
      this.cardNumber = CryptoJS.AES.encrypt(
        this.cardNumber,
        process.env.CRYPTOJS_SECRET_KEY
      ).toString();
    } catch (error) {
      throw new Error("Error while encrypting card number: " + error);
    }
  }

  decryptCardNumber() {
    try {
      return CryptoJS.AES.decrypt(
        this.cardNumber,
        process.env.CRYPTOJS_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
    } catch (error) {
      throw new Error("Error while decrypting card number: " + error);
    }
  }

  getPayment() {
    return this;
  }
}

const getLastDigits = (cardNumber) => {
  return cardNumber.slice(-4);
};

export default PaymentValidation;
