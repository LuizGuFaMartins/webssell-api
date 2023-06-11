import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClientEntity {
    @PrimaryGeneratedColumn()
    clientId: number;

    @Column()
    clientName: string;
}