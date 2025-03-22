import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    });
  }

  async count() {
    return await this.prisma.post.count();
  }

  async findOne(id: number) {
    return await this.prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
        tags: true,
      },
    });
  }

  async findPostByUser({
    userId,
    skip = 0,
    take = DEFAULT_PAGE_SIZE,
  }: {
    userId: number;
    skip?: number;
    take?: number;
  }) {
    return await this.prisma.post.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        published: true,
        slug: true,
        title: true,
        thumbnail: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },

      skip,
      take,
    });
  }

  async userPostCount(userId: number) {
    return await this.prisma.post.count({
      where: {
        authorId: userId,
      },
    });
  }

  async create(userId: number, createPostInput: CreatePostInput) {
    return await this.prisma.post.create({
      data: {
        ...createPostInput,
        author: {
          connect: {
            id: userId,
          },
        },
        tags: {
          connectOrCreate: createPostInput.tags.map((tag) => {
            return {
              where: {
                name: tag,
              },
              create: {
                name: tag,
              },
            };
          }),
        },
      },
    });
  }

  async update(userId: number, updatePostInput: UpdatePostInput) {
    const authorIdMatched = await this.prisma.post.findUnique({
      where: {
        id: updatePostInput.postId,
        authorId: userId,
      },
    });

    if (!authorIdMatched) {
      throw new UnauthorizedException(
        'You are not authorized to update this post',
      );
    }

    const { postId, ...data } = updatePostInput;
    return await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...data,

        tags: {
          set: [],
          connectOrCreate: updatePostInput?.tags?.map((tag) => ({
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          })),
        },
      },
    });
  }
}
