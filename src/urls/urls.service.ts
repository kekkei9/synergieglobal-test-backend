import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { CreateUrlDto, GenerateShortUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './entities/url.entity';
import { addDate } from '../utils/date';

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
    private readonly configService: ConfigService,
  ) {}

  create(createUrlDto: CreateUrlDto) {
    return this.urlRepository.save(createUrlDto);
  }

  findAll() {
    return this.urlRepository.find();
  }

  findOne(shortUrlId: string) {
    return this.urlRepository.findOneBy({
      shortUrlId,
    });
  }

  update(shortUrlId: string, updateUrlDto: UpdateUrlDto) {
    return this.urlRepository.update({ shortUrlId }, updateUrlDto);
  }

  remove(shortUrlId: string) {
    return this.urlRepository.delete({
      shortUrlId,
    });
  }

  async generateUniqueId() {
    let shortUrlId = nanoid(6);
    while (true) {
      const foundUrl = await this.urlRepository.findOneBy({ shortUrlId });
      if (!foundUrl) break;
      shortUrlId = nanoid(6);
    }
    return shortUrlId;
  }

  async generateShortUrl({ url }: GenerateShortUrlDto) {
    const clientUrl = this.configService.get('config.baseUrl');

    // creating short url using nanoid
    const shortUrlId = await this.generateUniqueId();
    const expiredAt = addDate(
      new Date(),
      this.configService.get('config.url.shortLinkExpiration') ?? '30d',
    );

    await this.urlRepository.save({
      originalUrl: url,
      shortUrlId,
      expiredAt,
    });

    const shortUrl = `${clientUrl}/${shortUrlId}`;
    return { shortUrl };
  }

  async getOriginalUrl(shortUrlId: string) {
    const foundUrl = await this.urlRepository.findOneBy({ shortUrlId });
    // checking if short url is present
    if (foundUrl === null) {
      throw new NotFoundException({ message: 'No Url found' });
    }

    // redirect to the original url
    return foundUrl;
  }
}
