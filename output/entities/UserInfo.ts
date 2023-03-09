import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("uq_user_info_address", ["address"], { unique: true })
@Index("uq_user_info_user_id", ["userId"], { unique: true })
@Entity("user_info", { schema: "phone_app" })
export class UserInfo {
  @PrimaryGeneratedColumn({ type: "int", name: "user_info_id", unsigned: true })
  userInfoId: number;

  @Column("int", { name: "user_id", unique: true, unsigned: true })
  userId: number;

  @Column("varchar", { name: "surname", length: 30, default: () => "'0'" })
  surname: string;

  @Column("varchar", { name: "forename", length: 30, default: () => "'0'" })
  forename: string;

  @Column("varchar", {
    name: "address",
    unique: true,
    length: 120,
    default: () => "'0'",
  })
  address: string;

  @Column("date", { name: "birth_date" })
  birthDate: string;

  @Column("varchar", { name: "occupation", length: 120 })
  occupation: string;

  @Column("enum", {
    name: "contact",
    enum: ["email", "phone-conntact"],
    default: () => "'email'",
  })
  contact: "email" | "phone-conntact";

  @Column("varchar", { name: "email", nullable: true, length: 50 })
  email: string | null;

  @Column("varchar", { name: "phone", nullable: true, length: 50 })
  phone: string | null;

  @OneToOne(() => User, (user) => user.userInfo, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
