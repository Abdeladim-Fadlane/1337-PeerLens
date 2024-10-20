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
    grade: string;

    @Column({ nullable: true })
    level: string;

    @Column({ nullable: true })
    campus: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    blackholed_at: string;

    @Column({ nullable: true })
    begin_at: string;

    @Column({ nullable: true })
    displayName: string;

    @Column({ nullable: true })
    skills: string;

    @Column({ nullable: true })
    login: string; 

    @Column({ nullable: true })
    accessToken: string;
}
