import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  // пайпы имеют 2 основных предназначения: 1) преобразовывать входные данные; 2) валидация входных данных
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const objectToValidate = plainToClass(metadata.metatype, value); // объект, который мы будем валидировать, тело запроса
    const errors = await validate(objectToValidate);
    const formattedErrors = {};
    if (errors.length) {
      errors.map((error) => {
        return Object.assign(formattedErrors, {
          [error.property]: Object.values(error.constraints),
        });
      });
      throw new ValidationException(formattedErrors);
    }
    return value;
  }
}
