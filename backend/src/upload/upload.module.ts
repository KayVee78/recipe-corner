import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { FileUploadService } from './upload.service';
import { multerOptions } from 'src/config/mutler.config';

@Module({
  imports: [MulterModule.register(multerOptions)],
  controllers: [UploadController],
  providers: [FileUploadService],
})
export class UploadModule {}
