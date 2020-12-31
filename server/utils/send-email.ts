import emailBody from './email-template';

export function sendEmailOnFileUpload(fileInfo: any) {

    let email  = emailBody.replace("BASIS_FILE_URL", fileInfo.url);
    email = email.replace("BASIS_COMPANY_NAME",fileInfo.companyName );
    email = email.replace("BASIS_NAME", fileInfo.name);
    email = email.replace("BASIS_EMAIL", fileInfo.email);

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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");
    const msg = {
      to: 'saadnoor@cefalo.com',
      from: 'saadnoors9@gmail.com', 
      subject: 'New File Uploaded',
      html: email,
    }

    return sgMail.send(msg);
}