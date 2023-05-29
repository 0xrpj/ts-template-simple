import { IsString, IsNotEmpty } from 'class-validator';

export class testDto {
  @IsString()
  @IsNotEmpty()
  public txHash: string;
}
