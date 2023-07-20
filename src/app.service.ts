import { Injectable } from '@nestjs/common';
import { SES } from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const SES_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'eu-north-1',
};

@Injectable()
export class AppService {
  async testRequest(text: string) {
    return String(text).split('').reverse().join('');
  }
  async sendEmail(receiver: string, name: string): Promise<any> {
    const AWS_SES = new SES(SES_CONFIG);
    const params = {
      Source: 'alex.borovikov95@gmail.com',
      Destination: {
        ToAddresses: [receiver],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: '<h1>This is the body of html-email</h1>',
          },
          Text: {
            Charset: 'UTF-8',
            Data: '<h1>This is the body of html-email-text</h1>',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Hello ${name} from subject!`,
        },
      },
    };

    try {
      const res = await AWS_SES.sendEmail(params).promise();
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
