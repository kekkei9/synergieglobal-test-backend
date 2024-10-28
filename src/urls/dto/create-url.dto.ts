import { IsString } from 'class-validator';

export class GenerateShortUrlDto {
  @IsString()
  url: string;
}

export class CreateUrlDto {
  @IsString()
  shortUrlId: string;
}
