import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Match from '#models/match'
import { randomUUID } from 'node:crypto'

export default class Club extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare address: string

  @column()
  declare city: string

  @column()
  declare zip_code: string

  @column()
  declare country: string

  @column()
  declare phone: string

  @column()
  declare email: string

  @hasMany(() => Match)
  declare matches: HasMany<typeof Match>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(club: Club) {
    club.id = randomUUID()
  }
}
