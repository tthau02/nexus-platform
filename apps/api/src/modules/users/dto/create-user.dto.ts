import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  MinLength,
  IsArray,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '0123456789', required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ example: 'https://example.com/avatar.png', required: false })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @ApiProperty({ example: [1, 2], required: false, type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  roleIds?: number[];
}
