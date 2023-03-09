import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "./Photo";
import { UserArticle } from "./UserArticle";

@Entity("article", { schema: "phone_app" })
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "article_id", unsigned: true })
  articleId: number;

  @Column("varchar", { name: "title", length: 50, default: () => "'0'" })
  title: string;

  @Column("varchar", { name: "name", length: 20, default: () => "'0'" })
  name: string;

  @Column("varchar", { name: "excerpt", length: 255, default: () => "'0'" })
  excerpt: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("enum", {
    name: "status",
    enum: ["visible", "hidden"],
    default: () => "'visible'",
  })
  status: "visible" | "hidden";

  @OneToMany(() => Photo, (photo) => photo.article)
  photos: Photo[];

  @OneToMany(() => UserArticle, (userArticle) => userArticle.article)
  userArticles: UserArticle[];
}
