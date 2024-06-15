import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Delete,
  Query,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AuthGuard } from '@nestjs/passport';
import { CartValidationPipe } from './pipes/cart-pipe';
import { RolesGuard } from 'src/users/guards/role.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { Cart } from './entities/cart.entity';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @Roles(Role.user)
  create(
    @Body(CartValidationPipe) createCartDto: CreateCartDto,
    @Request() req: any,
  ) {
    const user = req.user;
    return this.cartsService.create(createCartDto, user);
  }

  @Get()
  @Roles(Role.user)
  findAll() {
    return this.cartsService.findAll();
  }

  @Delete(':id')
  @Roles(Role.user)
  remove(
    @Param('id') id: number,
    @Query('itemToDelete') itemToDelete: number,
    @Request() req: any,
  ): Promise<{ msg: string; cart?: Cart }> {
    const user = req.user;
    return this.cartsService.remove(id, itemToDelete, user);
  }
}
