import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PusherChannel, PusherEvent, PusherService } from 'nestjs-pusher';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly pusherService: PusherService,
    ) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }


    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.usersService.findOne(id);
    }






    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
