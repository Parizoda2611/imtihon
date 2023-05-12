import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdvertsService } from './adverts.service';
import { diskStorage } from 'multer';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { extname } from 'path';

@Controller('advert')
export class AdvertsController {
  constructor(private readonly advertsService: AdvertsService ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('advert_photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          return cb(null, `${Date.now()}${extname(file.originalname)}`)
        }
      })
    })
  )
  create(@Body() createAdvertDto: CreateAdvertDto) {
    return this.advertsService.create(createAdvertDto);

  }

  @Get()
  findAll() {
    return this.advertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdvertDto: UpdateAdvertDto) {
    return this.advertsService.update(+id, updateAdvertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advertsService.remove(+id);
  }
}
