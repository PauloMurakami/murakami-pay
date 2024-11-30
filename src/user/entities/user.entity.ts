import { Role } from "src/roles/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecoveryToken } from "./recovery-token.entity"; 
import { Exclude } from "class-transformer";
import { Calendar } from "src/calendar/entities/calendar.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    name: string;

    @Column({ type: 'varchar', length: 15 })
    username: string;

    @Column({ type: 'varchar', length: 40 })
    email: string;

    @Exclude() 
    @Column({ type: 'varchar' })
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => RecoveryToken, recoveryToken => recoveryToken.user)
    recoveryTokens: RecoveryToken[];

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];

    @OneToMany(() => Calendar, calendar => calendar.user)
    calendars: Calendar[];
}
