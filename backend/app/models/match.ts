import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Club from '#models/club'
import { randomUUID } from 'node:crypto'

export default class Match extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime()
  declare date: DateTime

  @column()
  declare status: 'waiting' | 'playing' | 'finished'

  @column()
  declare isBooked: boolean

  @column()
  declare price: number

  @column()
  declare playersCount: number

  @column()
  declare playersMax: number

  @column()
  declare duration: number

  @column()
  declare courtNumber: string | null

  @column()
  declare level: '1' | '2' | '3' | '3+' | '4' | '4+' | '5' | '5+'

  @column()
  declare creatorId: string

  @column()
  declare clubId: string

  @belongsTo(() => User, {
    foreignKey: 'creator_id',
  })
  declare creator: BelongsTo<typeof User>

  @belongsTo(() => Club)
  declare club: BelongsTo<typeof Club>

  @manyToMany(() => User, {
    pivotTable: 'match_users',
    pivotColumns: ['team', 'elo_before', 'elo_after', 'score'],
  })
  declare players: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(match: Match) {
    match.id = randomUUID()
  }
}
