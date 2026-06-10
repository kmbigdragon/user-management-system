import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Version } from '@nestjs/common';
import { JwtTokenDto, SignInDto, VerifyDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Version('1')
  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<JwtTokenDto> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Version('1')
  @Get('profile')
  getProfile(@Request() req: Request & { user: VerifyDto }): VerifyDto {
    return req.user;
  }
}
