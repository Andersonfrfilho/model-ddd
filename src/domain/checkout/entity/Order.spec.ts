import Order from "./Order"
import OrderItem from "./Order_Item"

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", [])
    }).toThrowError("Id is required")
  })

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", [])
    }).toThrowError("customerId is required")
  })

  it("should throw error when item is empty", () => {
    expect(() => {
      let order = new Order("123", "123", [])
    }).toThrowError("Item are required")
  })

  it("should calculate total", () => {
    const item1 = new OrderItem("123", "item1", 123, "p1", 2);
    const order = new Order("123", "123", [item1]);

    let total = order.total();

    expect(total).toBe(246);

    const item2 = new OrderItem("123", "item2", 123, "p2", 2);
    const order2 = new Order("123", "123", [item1, item2]);

    total = order2.total();

    expect(total).toBe(492);
  })

  it("should check if the item qtd is greater than 0", () => {
    expect(() => {
      const item1 = new OrderItem("123", "item1", 123, "p1", 0);
      const order = new Order("123", "123", [item1]);
    }).toThrowError("Quantity must be greater than 0");
  })

})