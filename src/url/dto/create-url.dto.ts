import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsUrl, IsEnum } from 'class-validator';
import { Publisher } from '../../common/publisher.enum';

export class CreateUrlDto {
  @ApiProperty({
    description: 'A valid https URL',
    example: 'https://www.google.com',
  })
  @IsUrl({
    require_protocol: true,
    require_valid_protocol: true,
  })
  @IsNotEmpty()
  longUrl: string;

  @ApiProperty({
    description: 'Publisher name',
    enum: ['pagesjaunes', 'google'],
  })
  @IsEnum(Publisher)
  @IsNotEmpty()
  publisher: Publisher;

  @ApiProperty({ description: 'EPJ Number', example: 123456 })
  @IsNumber()
  @IsNotEmpty()
  epj: number;
}
