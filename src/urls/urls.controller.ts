import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { GenerateShortUrlDto } from './dto/create-url.dto';
import { UrlsService } from './urls.service';
import { ApiBody } from '@nestjs/swagger';

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

  @Get('/:shortUrlId')
  async redirectToOriginalUrl(@Param('id') shortUrlId: string, @Res() res) {
    const foundUrl = await this.urlsService.getOriginalUrl(shortUrlId);
    res.redirect(foundUrl.originalUrl);
  }

  @Get()
  findAll() {
    return this.urlsService.findAll();
  }
}
