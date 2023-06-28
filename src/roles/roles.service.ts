import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role) private readonly rolesRepository: typeof Role){}

  async createRole(roleDto: CreateRoleDto): Promise<Role> {
    const role = await this.rolesRepository.create(roleDto);
    return role;
  }

  async getRoleByValue(value: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({where: {value}});
    return role;
  }
}
