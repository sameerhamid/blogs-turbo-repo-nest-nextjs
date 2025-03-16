import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}
  async likePost({ postId, userId }: { postId: number; userId: number }) {
    try {
      return !!(await this.prisma.like.create({
        data: {
          postId,
          userId,
        },
      }));
    } catch (error) {
      throw new BadRequestException("You've already liked this post");
    }
  }

  async unlikePost({ postId, userId }: { postId: number; userId: number }) {
    try {
      return !!(await this.prisma.like.delete({
        where: {
          userId_postId: {
            postId,
            userId,
          },
        },
      }));
    } catch (error) {
      throw new BadRequestException("You haven't liked this post");
    }
  }

  async getPostLikesCount(postId: number) {
    return await this.prisma.like.count({
      where: {
        postId,
      },
    });
  }

  async userLikedPost({ postId, userId }: { postId: number; userId: number }) {
    return !!(await this.prisma.like.findUnique({
      where: {
        userId_postId: {
          postId,
          userId,
        },
      },
    }));
  }
}
