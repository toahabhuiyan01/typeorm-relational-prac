import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";


@Entity()
export class Meeting {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    phone!: string;

    @Column()
    zoomUrl!: string;

    @ManyToMany(() => Employee, employee => employee.meetings, { onDelete: 'CASCADE' })
    attendees!: Employee[];
}