import { Entity, Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    description: string;

    @ManyToMany(() => User, user => user.roles)
    users: User[];
}
