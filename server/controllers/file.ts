import File from '../models/file';
import BaseCtrl from './base';
import { sendEmailOnFileUpload } from '../utils/send-email';
import NotificationEmail from '../models/notificationEmail';
 

class FileCtrl extends BaseCtrl {
  model = File;

  uploadFile = async (req, res) => {
    try {
      const fileInformation = req.body;
      fileInformation.url = req.file.location;
      const emails = await NotificationEmail.find();

      const obj = await new File(fileInformation).save();
      if(emails.length > 0) {
        sendEmailOnFileUpload(fileInformation, emails[0].email );
      }
      console.log('eshche');
      res.json(obj );

    } catch (error) {
      console.log(error.toLocaleString());

      return res.sendStatus(500).json(error.toString());
    }
  }
}

export default FileCtrl;
