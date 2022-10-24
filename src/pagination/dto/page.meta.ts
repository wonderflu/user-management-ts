import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from '../page.params';

export class PageMetaDto {
  @ApiProperty()
  readonly search: string;

  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly total: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, total }: PageMetaDtoParameters) {
    this.search = pageOptionsDto.search;
    this.page = pageOptionsDto.page;
    this.limit = pageOptionsDto.limit;
    this.total = total;
    this.pageCount = Math.ceil(this.total / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
