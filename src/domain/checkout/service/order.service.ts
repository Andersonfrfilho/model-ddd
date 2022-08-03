import Customer from "../entity/Customer";
import Order from "../entity/Order";
import { v4 as uuid } from "uuid";
import OrderItem from "../entity/Order_Item";

export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item")
    }

    const order = new Order(uuid(), customer.id, items);

    customer.addRewardPoint(order.total() / 2);

    return order;
  }
  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}