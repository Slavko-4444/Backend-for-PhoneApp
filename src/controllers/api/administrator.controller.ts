import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common'
import { Administrator } from 'output/entities/Administrator';
import { AddAdmnistratorDto } from 'src/dto/administrator/administrator.dto';
import { EditAdministratorDto } from 'src/dto/administrator/edit.administrator.dto';
import { ApiResponse } from 'src/msci/api.response';
import { AdministratorService } from 'src/services/administrator Service/administrator.service';

@Controller('api/administrator')
export class AdministratorController {

    constructor(
        private service: AdministratorService
    ) {}

    //http://localhost:3000/api/administrator/getAll
    @Get('getAll')
    getAll(): Promise<Administrator[]>{
        return this.service.getAlladministrators();
    }
    //http://localhost:3000/api/administrator
    @Post()
    add(@Body() data: AddAdmnistratorDto): Promise<Administrator|ApiResponse>{
        return this.service.addNewAdmin(data);
    }

    @Patch(':id')
    editById(@Param('id') id: number, @Body() data: EditAdministratorDto): Promise<Administrator|ApiResponse>{
        return this.service.editById(id, data);
    }

}