import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileUploadService {
  async saveFile(file: Express.Multer.File): Promise<string> {
    return file.filename;
  }

  async getFilePath(filename: string): Promise<string> {
    const filePath = path.resolve(`./images/${filename}`);
    if (fs.existsSync(filePath)) {
      return filePath;
    } else {
      throw new Error('File not found');
    }
  }
}
