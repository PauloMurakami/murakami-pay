import { CalendarEnum, CalendarVisibilityEnum, StatusEnum } from "src/enum/calendar.enum";
import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Column } from "typeorm";



@Entity()
export class Calendar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: CalendarEnum
    })
    type: CalendarEnum;

    @Column({
        type: "enum",
        enum: StatusEnum
    })
    status: StatusEnum;

    @Column({
        type: "enum",
        enum: CalendarVisibilityEnum
    })
    visibility: CalendarVisibilityEnum;
    
    @Column()
    expirated_at: Date;
    
    @Column({nullable: true})
    description: String;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, user => user.calendars)
    user: User
}
