export default class OrderItem {
  _id: string;
  _name: string;
  _price: number;
  _productId: string;
  _quantity: number;

  constructor(id: string, name: string, price: number, productId: string, quantity: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name
  }

  get price() {
    return this._price * this._quantity;
  }
  get quantity() {
    return this._quantity;
  }
  get productId(): string {
    return this._productId
  }
}