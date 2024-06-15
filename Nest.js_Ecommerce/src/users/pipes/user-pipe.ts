import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { userDto } from '../dto/create-users.dto';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  transform(value: userDto) {
    if (!value.email || !value.password) {
      throw new BadRequestException('Email and password are required.');
    }

    // Validate email format
    if (typeof value.email !== 'string' || !this.isValidEmail(value.email)) {
      throw new BadRequestException('Invalid email format');
    }

    // Validate password length
    if (typeof value.password !== 'string' || value.password.length < 6) {
      throw new BadRequestException(
        'Password must be at least 6 characters long',
      );
    }
    return value;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
