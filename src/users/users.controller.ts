import { Body, Controller, Post, Get, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role-dto';
import { BanUserDto } from './dto/ban-user-dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService){}

  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status: 200, type: User})
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({summary: 'Получить всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({summary: 'Получить всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({summary: 'Получить всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }
}