import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'matches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('date').notNullable()
      table.enum('status', ['waiting', 'playing', 'finished']).defaultTo('waiting')
      table.boolean('is_booked').defaultTo(false)
      table.integer('price').defaultTo(0)
      table.integer('players_count').defaultTo(0)
      table.integer('players_max').defaultTo(0)
      table.integer('duration').defaultTo(1)
      table.string('court_number').nullable()
      table.enum('level', ['1', '2', '3', '3+', '4', '4+', '5', '5+']).defaultTo('1')
      table.uuid('creator_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.uuid('club_id').unsigned().references('id').inTable('clubs').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
