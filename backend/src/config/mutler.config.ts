import { diskStorage } from 'multer';

export const multerConfig = {
  storage: diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
      const uniqueSuffix = file.originalname;
      cb(null, uniqueSuffix);
    },
  }),
};

export const multerOptions = {
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(new Error('Unsupported file type'), false);
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
  storage: multerConfig.storage,
};
