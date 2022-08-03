import Address from "../value-obejct/Address";
import CustomerFactory from "./customer.factory";

describe("customer factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Jhon");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jhon");
    expect(customer.Address).toBeDefined();
  })

  it("should create a customer with an address", () => {
    const address = new Address("street", 1, "13330-250", "sao paulo",)
    const customer = CustomerFactory.createWithAddress("Jhon", address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Product B");
    expect(customer.Address).toBe(address);
  })

})