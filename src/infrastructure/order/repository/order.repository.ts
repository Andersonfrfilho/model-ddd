import Order from "../../domain/entity/Order";
import OrderRepositoryInterface from "../../domain/repository/order.repository";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  async create(entity: Order): Promise<void> {
    try {
      console.log(entity.customerId)
      console.log(OrderModel.getAttributes())
      await OrderModel.create({
        id: entity.id,
        customer_id: "123",
        total: entity.total(),
        // items: entity.items.map((item) => ({
        //   id: item.id,
        //   name: item.name,
        //   price: item.price,
        //   product_id: item.productId,
        //   quantity: item.quantity
        // })),
      },
        // {
        //   include: [{ model: OrderItemModel }]
        // }
      );
    } catch (error) {
      console.log(error)
    }
  }
}