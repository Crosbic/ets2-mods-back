import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class UserEntity {
  @PrimaryColumn({
    type: 'integer',
    unique: true,
    nullable: false,
  })
  id: number

  @Column({
    
  })
}
