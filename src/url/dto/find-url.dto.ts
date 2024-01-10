import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Publisher } from '../../common/publisher.enum';

export class FindUrlDto {
  @ApiProperty({ description: 'EPJ Number', example: 123456 })
  @IsNumber()
  @IsNotEmpty()
  epj: number;

  @ApiProperty({
    description: 'Publisher name',
    enum: ['pagesjaunes', 'google'],
  })
  @IsEnum(Publisher)
  @IsNotEmpty()
  publisher: string;
}
