import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: { id: string; username: string; role: string }) {
    return this.jwtService.sign({
      sub: user.id,
      username: user.username,
      role: user.role,
    });
  }
}
