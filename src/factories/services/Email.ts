import EmailService from '../../services/EmailService';

export default class EmailServiceFactory {
  private static instance: EmailService;

  private constructor() { }

  static getInstance(): EmailService {
    if (!EmailServiceFactory.instance) {
      const emailService = new EmailService(
        process.env.MAIL_HOST,
        Number(process.env.MAIL_PORT),
        process.env.MAIL_USER,
        process.env.MAIL_PASSWORD,
      );

      EmailServiceFactory.instance = emailService;
      return EmailServiceFactory.instance;
    }

    return EmailServiceFactory.instance;
  }
}
