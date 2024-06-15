import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || !Number.isSafeInteger(parsedValue)) {
      throw new BadRequestException('Invalid ID format');
    }
    return parsedValue;
  }
}
