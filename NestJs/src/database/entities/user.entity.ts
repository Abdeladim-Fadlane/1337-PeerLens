import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true }) 
    email: string;

    @Column({ nullable: true })
    login: string; 

    @Column({ nullable: true })
    accessToken: string;

    @Column({ nullable: true })
    user_id: number;
}
