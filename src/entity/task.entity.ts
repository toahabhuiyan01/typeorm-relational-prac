import { Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ default: '' })
    description!: string

    @ManyToOne(() => Employee, employee => employee.tasks, { onDelete: 'SET NULL' })
    @JoinTable()
    employee!: Employee
}