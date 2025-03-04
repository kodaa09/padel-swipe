import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, manyToMany, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { ManyToMany, HasMany } from '@adonisjs/lucid/types/relations'
import Match from '#models/match'
import Subscription from '#models/subscription'
import { randomUUID } from 'node:crypto'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare subscription: 'free' | 'premium'

  @column()
  declare elo: number

  @column()
  declare level: '1' | '2' | '3' | '3+' | '4' | '4+' | '5' | '5+'

  @column()
  declare matchesCreatedThisMonth: number

  @manyToMany(() => Match, {
    pivotTable: 'match_users',
    pivotColumns: ['team', 'elo_before', 'elo_after', 'score'],
  })
  declare matches: ManyToMany<typeof Match>

  @hasMany(() => Match, {
    foreignKey: 'creator_id',
  })
  declare createdMatches: HasMany<typeof Match>

  @hasMany(() => Subscription)
  declare subscriptions: HasMany<typeof Subscription>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @beforeCreate()
  static assignUuid(user: User) {
    user.id = randomUUID()
  }
}
