import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constants';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll({ skip = 0, take = DEFAULT_PAGE_SIZE }) {
    return await this.prisma.post.findMany({
      skip,
      take,
      include: {
        author: true,
      },
    });
  }

  async count() {
    return await this.prisma.post.count();
  }
}
