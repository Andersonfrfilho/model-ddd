import Address from "./Address";
import Customer from "./Customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const customer = new Customer("", "John");
    }).toThrowError("Id is required");
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      const customer = new Customer("123", "");
    }).toThrowError("Name is required");
  })

  it("should change name", () => {
    //Arrange
    const customer = new Customer("123", "John");

    //Act
    customer.changeName("Jane");

    //Assert
    expect(customer.name).toBe("Jane");
  })

  it("should activate customer", () => {
    //Arrange
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "14403-772", "City 1")
    //Act
    customer.Address = address;
    customer.activate()
    //Assert
    expect(customer.isActive()).toBeTruthy();
  })

  it("should deactivate customer", () => {
    //Arrange
    const customer = new Customer("1", "Customer 1");
    //Act
    customer.deactivate()
    //Assert
    expect(customer.isActive()).toBeFalsy();
  })

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");

      customer.activate()
    }).toThrowError("Address is mandatory to activate a customer");
  })

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1")

    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoint(10);
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoint(10);
    expect(customer.rewardPoints).toBe(20)
  })
})