import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post, PostWithCount } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { DEFAULT_PAGE_SIZE } from 'src/constants';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'posts' })
  findAll(
    @Context() context,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
  ) {
    console.log(context.req.user);
    return this.postService.findAll({ skip, take });
  }

  @Query(() => Int, { name: 'postCount' })
  count() {
    return this.postService.count();
  }

  @Query(() => Post)
  getPostById(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [PostWithCount])
  getUserPosts(
    @Context() context,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
  ) {
    const userId = +context.req.user.id;
    return this.postService.findPostByUser({ userId, skip, take });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Int!)
  userPostsCount(@Context() context) {
    const userId = +context.req.user.id;
    return this.postService.userPostCount(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  createPost(
    @Context() context,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    const userId = +context.req.user.id;
    return this.postService.create(userId, createPostInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  updatePost(
    @Context() context,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    const userId = +context.req.user.id;
    return this.postService.update(userId, updatePostInput);
  }
}
