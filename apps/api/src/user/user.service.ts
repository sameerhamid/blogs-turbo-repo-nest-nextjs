import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    // Check if a user with the given email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserInput.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password before saving
    const hashedPass = await hash(createUserInput.password);
    createUserInput.password = hashedPass;

    // Create and return the new user
    return await this.prisma.user.create({
      data: createUserInput,
    });
  }
}
