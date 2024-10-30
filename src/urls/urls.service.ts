import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { addDate } from '../utils/date';
import { GenerateShortUrlDto } from './dto/create-url.dto';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
    private readonly configService: ConfigService,
  ) {}

  findAll() {
    return this.urlRepository.find();
  }

  findOne(shortUrlId: string) {
    return this.urlRepository.findOneBy({
      shortUrlId,
    });
  }

  remove(shortUrlId: string) {
    return this.urlRepository.delete({
      shortUrlId,
    });
  }

  async isShortUrlIdExist(shortUrlId: string) {
    return !!(await this.urlRepository.findOneBy({ shortUrlId }));
  }

  async generateUniqueId() {
    let shortUrlId = nanoid(6);
    while (true) {
      if (!(await this.isShortUrlIdExist(shortUrlId))) break;
      shortUrlId = nanoid(6);
    }
    return shortUrlId;
  }

  async generateShortUrl({
    longUrl,
    password,
    customShortCode,
  }: GenerateShortUrlDto) {
    let shortUrlId;

    if (customShortCode) {
      if (await this.isShortUrlIdExist(customShortCode)) {
        throw new ConflictException('Custom short code already exists.');
      } else {
        shortUrlId = customShortCode;
      }
    } else {
      shortUrlId = await this.generateUniqueId();
    }

    const clientUrl = this.configService.get('config.baseUrl.frontend');

    // creating short url using nanoid
    const expiredAt = addDate(
      new Date(),
      this.configService.get('config.url.shortLinkExpiration') ?? '30d',
    );

    await this.urlRepository.save({
      originalUrl: longUrl,
      shortUrlId,
      expiredAt,
      ...(password ? { password: await bcrypt.hash(password, 10) } : {}),
    });

    const shortUrl = `${clientUrl}/${shortUrlId}`;
    return { shortUrl };
  }

  async getOriginalUrl(shortUrlId: string, password?: string) {
    const foundUrl = await this.urlRepository.findOneBy({ shortUrlId });

    // checking if short url is present
    if (foundUrl === null) {
      throw new NotFoundException({ message: 'No Url found' });
    }

    // Check if the URL has expired
    if (foundUrl.expiredAt && new Date() > new Date(foundUrl.expiredAt)) {
      throw new NotFoundException({ message: 'This URL has expired' });
    }

    // Check for password protection
    if (foundUrl.password) {
      if (!password) {
        throw new ForbiddenException({
          message: 'Password is required to access this URL',
        });
      }

      const isPasswordValid = await bcrypt.compare(password, foundUrl.password);
      if (!isPasswordValid) {
        throw new ForbiddenException({ message: 'Incorrect password' });
      }
    }

    // redirect to the original url
    return foundUrl;
  }
}
