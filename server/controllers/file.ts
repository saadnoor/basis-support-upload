import File from '../models/file';
import BaseCtrl from './base';
import { sendEmailOnFileUpload } from '../utils/send-email';
 

class FileCtrl extends BaseCtrl {
  model = File;

  uploadFile = async (req, res) => {
    try {
      const fileInformation = req.body;
      fileInformation.url = req.file.location;
      
      const obj = await new File(fileInformation).save();

      sendEmailOnFileUpload(fileInformation);

      res.json(obj );

    } catch (error) {
      console.log(error.toLocaleString());

      res.sendStatus(500).json(error.toString());
    }
  }
}

export default FileCtrl;
