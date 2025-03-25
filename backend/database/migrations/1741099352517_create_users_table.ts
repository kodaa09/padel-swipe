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
      table.string('phone').nullable()
      table.enum('role', ['player', 'teacher', 'club']).defaultTo('player')
      table.enum('subscription', ['free', 'premium']).defaultTo('free')
      table.integer('elo').defaultTo(100)
      table
        .enum('level', ['1', '2', '3', '3+', '4', '4+', '5', '5+', '6', '6+', '7', '7+', '8'])
        .defaultTo('1')
      table.integer('matches_created_this_month').defaultTo(0)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
