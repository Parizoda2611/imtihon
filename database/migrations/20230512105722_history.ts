import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('history', (table): void => {
        table.uuid('history_id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
        table.uuid('advert_id').references('advert_id').inTable('adverts').onDelete('set null')
        table.integer('history_sell').notNullable()
        table.integer('history_buy').notNullable()
        table.timestamp('history_created_at', {useTz: false}).defaultTo(knex.fn.now())
    
      })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('history')
}

