import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Max,
  Min,
} from 'class-validator'

export class SignInDto {
  @IsString()
  @Min(3)
  @Max(16)
  @IsNotEmpty()
  username: string

  @IsStrongPassword()
  @Min(8)
  @Max(32)
  @IsNotEmpty()
  password: string
}
