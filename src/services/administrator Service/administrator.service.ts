import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Administrator } from 'output/entities/Administrator';
import { AddAdmnistratorDto } from 'src/dto/administrator/administrator.dto';
import { EditAdministratorDto } from 'src/dto/administrator/edit.administrator.dto';
import { ApiResponse } from 'src/msci/api.response';
import { Repository } from 'typeorm';
import * as crypto from "crypto";
@Injectable()
export class AdministratorService {

    constructor(
        @InjectRepository(Administrator)
        private readonly administrator: Repository<Administrator>
    ) { }
    
    getAlladministrators(): Promise<Administrator[]> {
        return this.administrator.find();
    }
    getById(administratorId: number): Promise<Administrator> {
        return this.administrator.findOneById(administratorId);
    }

    addNewAdmin(data: AddAdmnistratorDto): Promise<Administrator | ApiResponse>{

        const crypto = require('crypto');
        const passwordHash = crypto.createHash('sha512');

        passwordHash.update(data.password);
        const passwordString = passwordHash.digest('hex').toUpperCase();

        let newAdmin: Administrator = new Administrator();
        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordString;

        return new Promise((resolve) => {
            this.administrator.save(newAdmin).then(response => resolve(response))
                .catch(err => resolve(new ApiResponse('error', -1001, 'Cannot add new Administratora!')))
        });

    }

    async editById(id: number, data: EditAdministratorDto): Promise<Administrator | ApiResponse> {

        let admin: Administrator = await this.administrator.findOneById(id);  
        // u slucaju da ne postoji trazeni administrator vracamo promise <ApiResponse>
        if (admin === null) {
            return new Promise(resolve => {
                resolve(new ApiResponse("error", -1002, 'Cannot update admin ' + admin.username));
            })
        }
        
        if (data.password !== undefined) {
            const passwordHash = crypto.createHash('sha512');
            
            passwordHash.update(data.password);
            const passwordString = passwordHash.digest('hex').toUpperCase();
            admin.passwordHash = passwordString;            
        }
        if (data.username !== undefined)
            admin.username = data.username;
        
        return this.administrator.save(admin);
    }
    

    async getByUsername(username: string): Promise<Administrator | null> {
        
        const admin : Administrator = await this.administrator.findOneBy({
            username: username
        });
         
        if (admin === undefined)
            return null;
        
        return admin;
    }
}