import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";


@Entity()
export class ContactInfo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    phone!: string;

    @Column()
    email!: string;

    @OneToOne(() => Employee, employee => employee.contactInfo, { onDelete: 'CASCADE' })
    @JoinColumn()
    employee!: Employee;
}