import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';

@Injectable()
export class AdvertsService {
  constructor(@Inject('KnexConnection') private knex: Knex){}
  async create(body: CreateAdvertDto): Promise<Record<string, string>> {
      const { sell, buy, url }= body
 
      await this.knex('adverts').insert({advert_sell: sell, advert_buy: buy, advert_url: url})

      return { message: 'success'}
  }

  async findAll() {
    const adverts = await this.knex('adverts').select('*').orderBy('advert_created_at', 'asc')
    return adverts;
  }

  async findOne(id: string) {
    const todo = await this.knex('adverts').select('*').where({advert_id: id}).first()
    
    if(!todo)
      throw new NotFoundException()

    return todo;
  }

  async update(id: string, body: UpdateAdvertDto) {
    const { sell, buy }= body
    
    const [advert] = await this.knex('adverts')
    .update({advert_sell: sell, advert_buy: buy})
    .where({advert_id:id})
    .returning('*')

    return advert;
  }

  async remove(id: string) {
    await this.knex('adverts').del().where({advert_id: id})

    return {message: 'success'}
  }
}
