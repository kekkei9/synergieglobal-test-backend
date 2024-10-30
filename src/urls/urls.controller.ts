import { join } from 'path';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { GenerateShortUrlDto } from './dto/create-url.dto';
import { UrlsService } from './urls.service';
import { ApiBody } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Controller('urls')
export class UrlsController {
  constructor(
    private readonly urlsService: UrlsService,
    private readonly configService: ConfigService,
  ) {}
  @Post()
  @ApiBody({
    type: GenerateShortUrlDto,
  })
  generateShortUrl(@Body() generateShortUrlDto: GenerateShortUrlDto) {
    return this.urlsService.generateShortUrl(generateShortUrlDto);
  }

  @Get('/:shortUrlId')
  async getOriginalUrl(@Param('shortUrlId') shortUrlId: string) {
    return await this.urlsService.getOriginalUrl(shortUrlId);
  }

  @Get()
  findAll() {
    return this.urlsService.findAll();
  }
}
