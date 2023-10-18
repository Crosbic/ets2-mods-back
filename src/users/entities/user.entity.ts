import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  email: string

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  username: string

  @Column({
    type: 'text',
    unique: false,
    nullable: false,
  })
  password: string

  @CreateDateColumn()
  dateCreated: string
}
