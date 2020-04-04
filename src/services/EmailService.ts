import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

import IEmail from '../interfaces/IEmail';
import logger from '../utils/logger';

export default class EmailService {
  private transport: nodemailer.Transporter;

  constructor(host: string, port: number, user: string, pass: string) {
    this.transport = nodemailer.createTransport({
      host,
      port,
      auth: { user, pass }
    });
  }

  send(email: IEmail) {
    return this.transport.sendMail(email);
  }

  sendConfirmation(email: IEmail, id: number, token: string) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(path.resolve(__dirname, '../templates/confirmation.ejs'),
        { id, token },
        async (err, data) => {
          if (err) {
            logger.error('error to render file', err);
            reject(err);
          }

          try {
            email.html = data;
            const response = await this.send(email);

            resolve(response);
          } catch (error) {
            logger.error('error to send email confirmation', err);
            reject(error);
          }
        });
    });
  }
}
