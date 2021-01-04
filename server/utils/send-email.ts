import emailBody from './email-template';
const sgMail = require('@sendgrid/mail');

export function sendEmailOnFileUpload(fileInfo: any, receiverEmailId: string): any {
    if (!receiverEmailId) { return; }

    let email  = emailBody.replace('BASIS_FILE_URL', fileInfo.url);
    email = email.replace('BASIS_COMPANY_NAME', fileInfo.companyName );
    email = email.replace('BASIS_NAME', fileInfo.name);
    email = email.replace('BASIS_EMAIL', fileInfo.email);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: receiverEmailId,
      from: 'saadnoors9@gmail.com',
      subject: 'New File Uploaded',
      html: email,
    };

    return sgMail.send(msg);
}
