import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { userInterface } from './interfaces/user.interface';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enums/role.enum';

@Injectable()
@UsePipes(new ValidationPipe())
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signupUser(signUpUser: userInterface): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({
      email: signUpUser.email,
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    if (signUpUser.role && !Object.values(Role).includes(signUpUser.role)) {
      throw new BadRequestException('Invalid role specified');
    }

    const role: Role = Role[signUpUser.role as keyof typeof Role] || Role.user;

    const newUser = new User({
      email: signUpUser.email,
      password: await bcrypt.hash(signUpUser.password, 10),
      role: role as Role,
    });

    return this.usersRepository.save(newUser);
  }

  async loginUser(loginUser: userInterface): Promise<{ access_token: string }> {
    const existingUser = await this.usersRepository.findOneBy({
      email: loginUser.email,
    });

    if (!existingUser) {
      throw new NotFoundException('Email Not Found');
    }

    const passwordMatch = await bcrypt.compare(
      loginUser.password,
      existingUser.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
