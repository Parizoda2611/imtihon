import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('adverts', (table) => {
        table.uuid('advert_id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
        table.integer('advert_sell').notNullable();
        table.integer('advert_buy').notNullable();
        table.string('advert_url', 255).notNullable();
        table.string('advert_photo', 64).notNullable();
        table
        .timestamp('advert_created_at', {useTz: false})
        .defaultTo(knex.fn.now())
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('adverts')
}

