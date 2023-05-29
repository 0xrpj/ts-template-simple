import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export const validateIncommingMessage = async (
  type: any,
  message: any,
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
) => {
  const errors: ValidationError[] = await validate(plainToInstance(type, message), { skipMissingProperties, whitelist, forbidNonWhitelisted });
  if (errors.length > 0) {
    const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
    throw new Error(message);
  }
  return;
};
