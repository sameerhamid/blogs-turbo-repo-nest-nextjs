import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @MinLength(3)
  @Field()
  name: string;

  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @MinLength(3)
  @Field()
  password: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  avatar?: string;
}
