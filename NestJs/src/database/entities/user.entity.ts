import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true }) // Ensure emails are unique
    email: string;

    @Column({ nullable: true })
    grade: string; // Adjust type as necessary

    @Column({ nullable: true })
    level: number;

    @Column({ nullable: true })
    campus: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    available: string;

    @Column({ nullable: true })
    blackholed_at: string;

    @Column({ nullable: true })
    begin_at: string;

    @Column({ nullable: true })
    project: string;

    @Column({ nullable: true })
    skills: string;

    @Column({ nullable: true })
    achievements: string; 

    @Column({ nullable: true })
    accessToken: string;
}
