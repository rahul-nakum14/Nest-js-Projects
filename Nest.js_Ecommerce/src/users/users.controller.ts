import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { userDto } from './dto/create-users.dto';
import { User } from './entities/user.entity';
import { UserValidationPipe } from './pipes/user-pipe';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async signup(
    @Body(UserValidationPipe) signupUserDto: userDto,
  ): Promise<User> {
    return this.usersService.signupUser(signupUserDto);
  }

  @Post('/login')
  async login(
    @Body(UserValidationPipe) loginUser: userDto,
  ): Promise<{ access_token: string }> {
    return this.usersService.loginUser(loginUser);
  }
}
