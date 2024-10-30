import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, ValidateIf } from 'class-validator';
import { IsUrl } from '../../validators/IsUrl.validator';

export class GenerateShortUrlDto {
  @ApiProperty()
  @IsString()
  @IsUrl()
  longUrl: string;

  @ApiProperty()
  @IsOptional() // Make the field optional
  @IsString()
  @ValidateIf((o) => o.password !== '') // Only validate if not empty
  @Length(6, undefined, {
    message: 'Password must be at least 6 characters long.',
  })
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  customShortCode?: string;
}

export class GetOriginalUrlDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string;
}
