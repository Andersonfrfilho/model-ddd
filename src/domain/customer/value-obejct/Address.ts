// 
export default class Address {
  _street: string;
  _number: number;
  _zip: string;
  _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this.validate();
  }

  get number() { return this._number; }

  get zip() { return this._zip; }

  get city() { return this._city; }

  get street() { return this._street; }

  validate() {
    if (this._city.length === 0) {
      throw new Error("City is invalid");
    }

    if (this._number <= 0) {
      throw new Error("Number is invalid");
    }
  }

  toString() {
    return `${this._street}, ${this._number} ${this._zip} ${this._city}`
  }
}