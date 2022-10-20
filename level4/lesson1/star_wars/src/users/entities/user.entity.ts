import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../auth/roles/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  //@ApiProperty({ example: "Luke Skywalker", description: 'The name of this person' })
  userId: number;

  @Column({ unique: true })
  @ApiProperty({ example: "Skywalker", description: 'Login of user' })
  username: string;

  @Column()
  @ApiProperty({ example: "pass1234", description: 'Password of user' })
  password: string;

  @Column({default: Role.User})
  //@Column("simple-array")
  roles: Role;
}