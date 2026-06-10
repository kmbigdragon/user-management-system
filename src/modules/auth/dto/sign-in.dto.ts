import { Role, Status } from '@/generated/prisma/enums';
import { IsEmail, Matches } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email!: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/, {
    message: 'Password must be at least 8 characters long and contain uppercase, lowercase and special characters',
  })
  password!: string;
}

export class JwtTokenDto {
  accessToken!: string;
}

export class VerifyDto {
  uid!: string;
  email!: string;
  name!: string;
  role!: Role;
  status!: Status;
}
