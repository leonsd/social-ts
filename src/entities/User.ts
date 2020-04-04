import {
  BeforeInsert,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  AfterInsert
} from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import EmailService from '../factories/services/Email';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 100 })
  email: string;

  @Column({ nullable: false, length: 100, select: false })
  password: string;

  @Column({ nullable: true, length: 100, select: false })
  token: string;

  @Column({ nullable: false, default: false })
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  private hashPassword() {
    this.token = jwt.sign(this.email, process.env.APP_SECRET);
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @AfterInsert()
  private async sendConfirmationMail() {
    const email = EmailService.getInstance();

    await email.sendConfirmation(
      {
        from: 'register@socialts.com',
        to: this.email,
        subject: 'email confirmation',
        html: ''
      },
      this.id,
      this.token
    );
  }
}
