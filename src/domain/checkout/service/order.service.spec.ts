import Customer from "../entity/Customer";
import Order from "../entity/Order";
import OrderItem from "../entity/Order_Item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should create an order", () => {
    const customer = new Customer("client1", "Customer 1");
    const item1 = new OrderItem("i1", "Item1", 10, "p1", 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it("should get total of all orders", () => {
    const item1 = new OrderItem("123", "item1", 123, "p1", 2);
    const item2 = new OrderItem("123", "item2", 123, "p2", 2);

    const order1 = new Order("order1", "c1", [item1]);
    const order2 = new Order("order1", "c1", [item2]);

    const total = OrderService.total([order1, order2])

    expect(total).toBe(492)
  })


})