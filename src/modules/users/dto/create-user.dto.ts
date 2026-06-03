import { IsEmail, IsString, IsDateString, IsPhoneNumber, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/, {
    message: 'Password must be at least 8 characters long and contain uppercase, lowercase and special characters',
  })
  password!: string;

  @IsDateString()
  dob!: string;

  @IsPhoneNumber('VN')
  phone!: string;
}
