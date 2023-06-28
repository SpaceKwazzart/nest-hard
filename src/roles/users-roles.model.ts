import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany } from "sequelize";
import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";


@Table({'tableName': 'users_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles>{
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(() => Role)
  @Column({type: DataType.INTEGER})
  roleId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER}) 
  userId: number;
}

