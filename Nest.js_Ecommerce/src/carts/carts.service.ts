import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createcartInterfaces } from './interfaces/createCart-interfaces';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // async create(
  //   createCart: createcartInterfaces,
  //   user: any,
  // ): Promise<{ msg: string; cart: Cart }> {
  //   const productExists = await this.productRepository.findOne({
  //     where: { id: createCart.product_id },
  //   });

  //   if (!productExists) {
  //     throw new NotFoundException('Product does not exist');
  //   }

  //   const cart = await this.cartRepository.findOne({
  //     where: { user: { id: user.userId } },
  //     relations: ['user'],
  //   });

  //   if (!cart) {
  //     const newCart = new Cart({
  //       product_id: [productExists.id],
  //       quantity: createCart.quantity,
  //       price: productExists.product_price,
  //       user: user.userId,
  //     });

  //     await this.cartRepository.save(newCart);
  //     return { msg: 'Added To cart', cart: newCart };
  //   } else {
  //     cart.product_id.push(productExists.id);
  //     cart.quantity += createCart.quantity;
  //     cart.price += productExists.product_price * createCart.quantity;
  //     await this.cartRepository.save(cart);
  //     return { msg: 'Updated', cart: cart };
  //   }
  // }

  async create(
    createCart: createcartInterfaces,
    user: any,
  ): Promise<{ msg: string; cart: Cart }> {
    const productExists = await this.productRepository.findOne({
      where: { id: createCart.product_id },
    });

    if (!productExists) {
      throw new NotFoundException('Product does not exist');
    }

    let cart = await this.cartRepository.findOne({
      where: { user: { id: user.userId } },
      relations: ['user'],
    });

    if (!cart) {
      cart = this.cartRepository.create({
        product_id: [productExists.id],
        quantity: createCart.quantity,
        price: productExists.product_price,
        user: user.userId,
      });
    } else {
      cart.product_id.push(productExists.id);
      cart.quantity += createCart.quantity;
      cart.price += productExists.product_price * createCart.quantity;
    }
    await this.cartRepository.save(cart);
    return { msg: 'Added To cart', cart: cart };
  }

  findAll(): Promise<Cart[]> {
    return this.cartRepository.find();
  }

  async remove(
    id: number,
    itemToDelete: number,
    user: any,
  ): Promise<{ msg: string; cart?: Cart }> {
    const cartExists = await this.cartRepository.findOne({
      where: { user: { id: user.userId }, id: id },
      relations: ['user'],
    });

    const productPrice = await this.productRepository.findOne({
      where: { id: itemToDelete },
    });

    if (!cartExists) {
      throw new NotFoundException('Cart does not exist');
    }

    const index = cartExists.product_id.indexOf(itemToDelete);

    if (index > -1) {
      cartExists.product_id.splice(index, 1);
    } else {
      throw new NotFoundException('Product does not exist in the cart');
    }

    cartExists.price = cartExists.price - productPrice.product_price;
    cartExists.quantity -= 1;

    await this.cartRepository.save(cartExists);
    return { msg: 'Deleted', cart: cartExists };
  }
}
