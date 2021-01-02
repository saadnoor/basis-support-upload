import * as mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: String,
  url: String,
  uploadTime: Date,
  email: String,
  isDeleted: { type: Boolean, default: false },
  companyName: String,
  fileName: String,
  phone: String
});

const File = mongoose.model('File', fileSchema);

export default File;
