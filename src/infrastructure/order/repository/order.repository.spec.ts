import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/Address";
import Customer from "../../domain/entity/Customer";
import Order from "../../domain/entity/Order";
import OrderItem from "../../domain/entity/Order_Item";
import Product from "../../domain/entity/Product";

import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";


describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
    await sequelize.sync()
  })

  afterAll(async () => {
    await sequelize.close();
  })

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer1");
    const address = new Address("street 1", 1, "zipcode1", "city1",)
    customer.changeAddress(address)
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "product 1", 10);
    await productRepository.create(product)

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)

    const order = new Order("123", "123", [orderItem])

    const orderRepository = new OrderRepository();
    console.log(order)
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"]
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123"
        }
      ]
    })
  })

})