import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductValidationPipe } from './pipes/product-pipe';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/users/guards/role.guard';
import { Role } from 'src/users/enums/role.enum';
import { Roles } from 'src/users/decorators/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(Role.superAdmin, Role.admin)
  async create(
    @Body(ProductValidationPipe) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Roles(Role.admin, Role.user, Role.superAdmin)
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Roles(Role.user, Role.admin, Role.superAdmin)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.superAdmin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ): Promise<{ msg: string; Product?: Product }> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Roles(Role.superAdmin)
  remove(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<{ msg: string; Product?: Product }> {
    return this.productsService.remove(+id);
  }
}
