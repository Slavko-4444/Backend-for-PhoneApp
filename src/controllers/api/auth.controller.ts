import { Body, Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { ApiResponse } from "src/msci/api.response";
import { AdministratorService } from "src/services/administrator Service/administrator.service";
import * as jwt from "jsonwebtoken";
import { AuthorizationDto } from "src/dto/authorization/auth.dto";
import { loginAuthoInfo } from "src/dto/authorization/auth.login.info.dto";
import { Administrator } from "output/entities/Administrator";
import * as crypto from "crypto";
import { JwtDataDto } from "src/dto/authorization/jwt.dto";
import { jwtSecret } from "config/jwt.Secrect";
import { UserService } from "src/services/User Service/user.service";
import { UserRegistrationDto } from "src/dto/user/add.user.dto";
import { User } from "output/entities/User";




@Controller('auth/Admin')
export class AuthController {
    constructor(private adminService: AdministratorService, private userService: UserService)
    { }

    //POST http://localhost:3000/auth/Admin/login/admin
    @Post('login/admin')
    async logInAdmin(@Body() data: AuthorizationDto, @Req() request: Request): Promise<loginAuthoInfo | ApiResponse> {
        

        const admin: Administrator = await this.adminService.getByUsername(data.username);
        if (admin === null)
           return new Promise(resolve => resolve(new ApiResponse('Bad Username', -8001, 'Cannot find admin with given username')));
    
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordString = passwordHash.digest('hex').toUpperCase();

        if (passwordString !== admin.passwordHash) 
            return new Promise(resolve => resolve(new ApiResponse('Bad Password', -8002, 'Bad password!')));
        
    
        const JwtData = new JwtDataDto();
        JwtData.role = "administrator";
        JwtData.Id = admin.administratorId;
        JwtData.identity = admin.username;
        

        JwtData.exp = this.getDatePlus(60 * 60 * 24); //token admina traje dan
        JwtData.ip = request.ip;
        JwtData.ua = request.headers["user-agent"].toString();

        const token: string = jwt.sign(JwtData.toPlainObjectJWTdata(),jwtSecret); // generisemo token...

        const responseObject: loginAuthoInfo = new loginAuthoInfo(
            admin.administratorId,
            admin.username,
            token,
            "", 
            ""
        );
    
        return new Promise(resolve => { resolve(responseObject) });
    }

    
    // POST http://localhost:3000/auth/Admin/user/registration
    @Post('user/registration')
    async Registration(@Body() data: UserRegistrationDto): Promise<User | ApiResponse> {
        return await this.userService.register(data);
    }

    private getDatePlus(numberOfSec: number) {
        return new Date().getTime() / 1000 + numberOfSec;
    }

    private getIsoDate(timestamp: number) {

        const date = new Date();

        date.setTime(timestamp * 1000);
        return date.toISOString();
    }

    private getDataBaseDateFormat(isoFormat: string): string {
        return isoFormat.substr(0, 19).replace('T', ' ');
    }
}