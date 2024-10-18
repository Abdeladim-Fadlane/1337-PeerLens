import {Module} from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import {User } from "../database/entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    // imports :[PrismaModule],    
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
    imports: [TypeOrmModule.forFeature([User])],

})

export class AuthModule {}