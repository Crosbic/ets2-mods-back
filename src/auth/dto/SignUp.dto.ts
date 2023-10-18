import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Max,
  Min,
} from 'class-validator'

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @Min(3)
  @Max(16)
  @IsNotEmpty()
  readonly username: string

  @IsStrongPassword()
  @Min(8)
  @Max(32)
  @IsNotEmpty()
  readonly password: string
}
