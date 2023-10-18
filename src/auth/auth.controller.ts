import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { Public } from './decorators/public.decorator'
import { SignInDto } from './dto/SignIn.dto'
import { SignUpDto } from './dto/SignUp.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(
    @Body()
    signUpDto: SignUpDto
  ) {
    return this.authService.signUp(signUpDto)
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(
    @Body()
    signInDto: SignInDto
  ) {
    return this.authService.signIn(signInDto.username, signInDto.password)
  }
}
