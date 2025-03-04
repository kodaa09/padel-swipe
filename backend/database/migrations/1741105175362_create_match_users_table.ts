import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'match_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('match_id').unsigned().references('id').inTable('matches').onDelete('CASCADE')
      table.uuid('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.unique(['match_id', 'user_id'])
      table.enum('team', ['A', 'B'])
      table.integer('elo_before').defaultTo(0)
      table.integer('elo_after').defaultTo(0)
      table.integer('score').defaultTo(0)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
