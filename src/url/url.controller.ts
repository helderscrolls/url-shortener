import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { FindUrlDto } from './dto/find-url.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post('shorten')
  shortenUrl(
    @Body()
    url: CreateUrlDto,
  ) {
    return this.urlService.shortenUrl(url);
  }

  @Get('shorten')
  findOne(
    @Body()
    FindUrlDto: FindUrlDto,
  ) {
    return this.urlService.findOne(FindUrlDto);
  }

  @Get()
  findAll() {
    return this.urlService.findAll();
  }

  @ApiOkResponse({
    description:
      'Finds the correct data based on query params, increments its numberOfRedirects value and redirects to the longUrl.',
  })
  @Get(':code')
  async redirect(
    @Res() res,
    @Param('code')
    code: string,
  ) {
    const url = await this.urlService.redirect(code);

    return res.redirect(url.longUrl);
  }
}
