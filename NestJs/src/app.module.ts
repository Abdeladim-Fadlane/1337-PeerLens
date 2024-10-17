import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/entities/user.entity'; // Import the User entity

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres', // Use your database host here
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User], // Include your entities here
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature([User]), // Register the User entity for dependency injection
  ],
})
export class AppModule {}
