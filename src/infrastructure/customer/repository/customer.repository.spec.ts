import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/Address";
import Customer from "../../domain/entity/Customer";

import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";


describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterAll(async () => {
    await sequelize.close();
  })

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer1");
    const address = new Address("street 1", 1, "zipcode1", "city1",)
    customer.Address = address
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: "Customer1",
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city
    })
  })

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer1");
    const address = new Address("street 1", 1, "zipcode1", "city1",)
    customer.Address = address

    await customerRepository.create(customer);

    customer.changeName("Customer 2")

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: "Customer 2",
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city
    })
  })

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer1");
    const address = new Address("street 1", 1, "zipcode1", "city1",)
    customer.Address = address
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find("123")

    expect(customer).toStrictEqual(customerResult)
  })

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => await customerRepository.find("123")).rejects.toThrow("Customer not found")
  })

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer1");
    const address = new Address("street 1", 1, "zipcode1", "city1",)
    customer.Address = address
    await customerRepository.create(customer);

    const customer2 = new Customer("456", "Customer1");
    const address2 = new Address("street 2", 2, "zipcode2", "city2",)
    customer2.Address = address2
    await customerRepository.create(customer2);

    const customersResult = await customerRepository.findAll()
    const customers = [customer, customer2];
    expect(customers).toEqual(customersResult)
  })
})