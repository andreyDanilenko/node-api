import { IsEmail, IsString } from 'class-validator';
export class UserLoginDto {
	@IsEmail({}, { message: 'Wrong email specified' })
	email: string;

	@IsString({ message: 'No password specified' })
	password: string;
}
