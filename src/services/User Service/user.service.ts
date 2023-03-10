import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "output/entities/User";
import { UserRegistrationDto } from "src/dto/user/add.user.dto";
import { ApiResponse } from "src/msci/api.response";
import { Repository } from "typeorm";


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly user: Repository<User>)
    { }

    getById(userId: number): Promise<User> {
        return this.user.findOneById(userId);
    }

    register(data: UserRegistrationDto): Promise<User | ApiResponse> {
        return;
    }
}