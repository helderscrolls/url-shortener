import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { CreateUrlDto } from './dto/create-url.dto';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';
import { FindUrlDto } from './dto/find-url.dto';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}

  async shortenUrl(urlToShorten: CreateUrlDto) {
    const { longUrl, publisher, epj } = urlToShorten;

    //checks if longUrl is a valid URL
    if (!isURL(longUrl)) {
      throw new BadRequestException('String Must be a Valid URL');
    }

    const urlCode = nanoid(10);
    const baseURL = 'http://localhost:3000';

    try {
      //check if the URL has already been shortened
      let url = await this.urlRepository.findOneBy({ longUrl });
      //return it if it exists
      if (url) {
        return url.shortUrl;
      }

      //if it doesn't exist, shorten it
      const shortUrl = `${baseURL}/${urlCode}`;

      //add the new record to the database
      url = this.urlRepository.create({
        urlCode,
        longUrl,
        shortUrl,
        publisher,
        epj,
      });

      this.urlRepository.save(url);
      return url.shortUrl;
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('Server Error');
    }
  }

  async findOne(FindUrlDto: FindUrlDto) {
    const { epj, publisher } = FindUrlDto;

    const url = await this.urlRepository.findOne({
      where: { epj: +epj, publisher: publisher },
    });

    if (!url) {
      throw new NotFoundException(
        `No Short URL found with EPJ: ${epj} for ${publisher} publisher`,
      );
    }

    return url.shortUrl;
  }

  async findAll() {
    return this.urlRepository.find();
  }

  async redirect(urlCode: string) {
    try {
      const url = await this.urlRepository.findOneBy({ urlCode });
      if (url) {
        url.numberOfRedirects++;
        await this.urlRepository.save(url);
        return url;
      }
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Resource Not Found');
    }
  }
}
