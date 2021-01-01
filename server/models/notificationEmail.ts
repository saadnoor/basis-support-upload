import * as mongoose from 'mongoose';

const notificationEmailSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, trim: true },
});

const NotificationEmail = mongoose.model('NotificationEmail', notificationEmailSchema);

export default NotificationEmail;
