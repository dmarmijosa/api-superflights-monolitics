import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 50, {
    message: 'El nombre debe tener entre $constraint1 y $constraint2 caracteres',
  })
  name: string;

  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @Length(3, 50, {
    message:
      'El nombre de usuario debe tener entre $constraint1 y $constraint2 caracteres',
  })
  username: string;

  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  @Length(3, 50, {
    message: 'El email debe tener entre $constraint1 y $constraint2 caracteres',
  })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @Length(3, 50, {
    message:
      'La contraseña debe tener entre $constraint1 y $constraint2 caracteres',
  })
  password: string;
}
