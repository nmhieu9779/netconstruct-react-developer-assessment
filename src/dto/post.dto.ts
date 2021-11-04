import { AuthorDto } from './author.dto';
import { CategoryDto } from './category.dto';

export interface PostDto {
  id: string;

  title: string;

  publishDate: Date;

  author: AuthorDto;

  summary: string;

  categories: CategoryDto[];
}
