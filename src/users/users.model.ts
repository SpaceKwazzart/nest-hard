import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/users-roles.model";

interface UserCreationAttrs {
  email: string,
  password: string,
}

@Table({'tableName': 'users'})
export class User extends Model<User, UserCreationAttrs>{
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'example@gmail.com', description: 'Уникальная почта'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({example: 'djah4523KJHkajhsfk', description: 'Пароль пользователя'})
  @Column({type: DataType.STRING, allowNull: false}) 
  password: string;

  @ApiProperty({example: 'false', description: 'Статус бана пользователя'})
  @Column({type: DataType.BOOLEAN, defaultValue: false}) 
  banned: boolean;

  @ApiProperty({example: 'за хулиганство', description: 'Причина бана'})
  @Column({type: DataType.STRING, allowNull: true}) 
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}

