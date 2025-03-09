import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/signin-input';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { User } from '@prisma/client';
import { AuthPayload } from './entities/auth-payload.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found with this email');
    }

    if (!user.password) {
      throw new UnauthorizedException('Please Enter Password');
    }
    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  async generateToken(userId: number) {
    const payload: AuthJwtPayload = {
      sub: {
        userId: userId,
      },
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async login(user: User): Promise<AuthPayload> {
    const { accessToken } = await this.generateToken(user.id);
    return {
      id: user.id,
      name: user.name,
      avatar: user?.avatar ?? undefined,
      email: user.email,
      accessToken,
    };
  }
}
