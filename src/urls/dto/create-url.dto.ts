import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsUrl } from '../../validators/IsUrl.validator';

export class GenerateShortUrlDto {
  @ApiProperty()
  @IsString()
  @IsUrl()
  url: string;
}

export class CreateUrlDto {
  @ApiProperty()
  @IsString()
  shortUrlId: string;
}
