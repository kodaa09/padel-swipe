import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.enum('subscription', ['free', 'premium']).defaultTo('free')
      table.integer('elo').defaultTo(100)
      table.integer('matches_created_this_month').defaultTo(0)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
