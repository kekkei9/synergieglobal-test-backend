import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenerateShortUrlDto } from './dto/create-url.dto';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}
  @Post()
  generateShortUrl(@Body() generateShortUrlDto: GenerateShortUrlDto) {
    return this.urlsService.generateShortUrl(generateShortUrlDto);
  }

  @Get()
  findAll() {
    return this.urlsService.findAll();
  }
}
