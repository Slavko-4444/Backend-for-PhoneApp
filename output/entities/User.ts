import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserArticle } from "./UserArticle";
import { UserInfo } from "./UserInfo";

@Index("uq_user_email", ["email"], { unique: true })
@Entity("user", { schema: "phone_app" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", {
    name: "email",
    unique: true,
    length: 255,
    default: () => "'0'",
  })
  email: string;

  @Column("varchar", {
    name: "password_hash",
    length: 128,
    default: () => "'0'",
  })
  passwordHash: string;

  @Column("varchar", { name: "forename", length: 64, default: () => "'0'" })
  forename: string;

  @Column("varchar", { name: "surname", length: 64, default: () => "'0'" })
  surname: string;

  @Column("varchar", { name: "phone_number", length: 64, default: () => "'0'" })
  phoneNumber: string;

  @OneToMany(() => UserArticle, (userArticle) => userArticle.user)
  userArticles: UserArticle[];

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user)
  userInfo: UserInfo;
}
