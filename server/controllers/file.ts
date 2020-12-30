import File from '../models/file';
import BaseCtrl from './base';

class FileCtrl extends BaseCtrl {
  model = File;

  uploadFile = async (req, res) => {
    try {
      const fileInformation = req.body;
      const file = req.file;

      console.log(fileInformation, file);

      res.json({  fileInformation, fileName: file.location });
    } catch (error) {
      console.log(error.toLocaleString());

      res.sendStatus(500).json(error.toString());
    }
  }
}

export default FileCtrl;
