import File from '../models/file';
import BaseCtrl from './base';
import emailBody from '../utils/email-template';
 

class FileCtrl extends BaseCtrl {
  model = File;

  uploadFile = async (req, res) => {
    try {
      const fileInformation = req.body;
      fileInformation.url = req.file.location;
      
      const obj = await new File(fileInformation).save();

      let email  = emailBody.replace("BASIS_FILE_URL", req.file.location);
      email = email.replace("BASIS_COMPANY_NAME",fileInformation.companyName );
      email = email.replace("BASIS_NAME", fileInformation.name);
      email = email.replace("BASIS_EMAIL", fileInformation.email);

      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey("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");
      const msg = {
        to: 'saadnoor@cefalo.com', // Change to your recipient
        from: 'saadnoors9@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        html: email,
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })


      res.json(obj );

    } catch (error) {
      console.log(error.toLocaleString());

      res.sendStatus(500).json(error.toString());
    }
  }
}

export default FileCtrl;
