import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { GenerateShortUrlDto, GetOriginalUrlDto } from './dto/create-url.dto';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}
  @Post()
  @ApiBody({
    type: GenerateShortUrlDto,
  })
  generateShortUrl(@Body() generateShortUrlDto: GenerateShortUrlDto) {
    return this.urlsService.generateShortUrl(generateShortUrlDto);
  }

  @ApiBody({
    type: GetOriginalUrlDto,
  })
  @Post('/:shortUrlId')
  async getOriginalUrl(
    @Param('shortUrlId') shortUrlId: string,
    @Body() getOriginalUrlDto: GetOriginalUrlDto,
  ) {
    return this.urlsService.getOriginalUrl(
      shortUrlId,
      getOriginalUrlDto.password,
    );
  }

  @Get()
  findAll() {
    return this.urlsService.findAll();
  }
}
