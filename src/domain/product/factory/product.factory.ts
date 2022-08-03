import Product from "../entity/Product";
import { v4 as uuid } from "uuid";
import ProductInterface from "../entity/product.interface";
import ProductB from "../entity/Product -b";

export default class ProductFactory {
  public static create(type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price)
      case "b":
        return new ProductB(uuid(), name, price)
      default:
        throw new Error("Product type not supported invalid")
    }
  }
}