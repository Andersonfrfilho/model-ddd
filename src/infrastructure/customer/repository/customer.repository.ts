import Address from "../../domain/entity/Address";
import Customer from "../../domain/entity/Customer";
import CustomerRepositoryInterface from "../../domain/repository/customer.repository";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      city: entity.Address.city
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      city: entity.Address.city
    }, {
      where: {
        id: entity.id,
      }
    })

  }

  async find(id: string): Promise<Customer> {
    let customerModel
    try {
      customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true })
    } catch (error) {
      throw new Error("Customer not found")
    }
    const customer = new Customer(customerModel.id, customerModel.name)
    const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city)
    customer.changeAddress(address)
    return customer

  }

  async findAll(): Promise<Customer[]> {
    const customerModel = await CustomerModel.findAll();
    return customerModel.map(customerModelParam => {
      const customer = new Customer(customerModelParam.id, customerModelParam.name)
      const address = new Address(customerModelParam.street, customerModelParam.number, customerModelParam.zipcode, customerModelParam.city)
      customer.Address = address
      return customer
    })
  }

}