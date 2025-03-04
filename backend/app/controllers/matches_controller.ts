import Match from '#models/match'
import type { HttpContext } from '@adonisjs/core/http'

export default class MatchesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const matches = await Match.query().preload('creator').preload('club').preload('players')

    return response.status(200).json({
      status: 'success',
      message: 'Liste des matches récupérée avec succès',
      data: matches,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const user = auth.user!
    const matchData = request.only([
      'date',
      'status',
      'isBooked',
      'price',
      'playersMax',
      'duration',
      'courtNumber',
      'level',
      'clubId',
    ])

    // Définir l'utilisateur actuel comme créateur
    const matchDataWithCreator = {
      ...matchData,
      creatorId: user.id,
      playersCount: 1,
    }

    const match = await Match.create(matchDataWithCreator)

    // Ajouter le créateur comme joueur
    await match.related('players').attach({
      [user.id]: {
        team: 'A', // Par défaut, le créateur est dans l'équipe A
        elo_before: 0, // À ajuster selon votre logique d'ELO
        elo_after: 0,
        score: 0,
      },
    })

    // Recharger les relations
    await match.refresh()
    await match.load('creator')
    await match.load('club')
    await match.load('players')

    return response.status(201).json({
      status: 'success',
      message: 'Match créé avec succès',
      data: match,
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const match = await Match.query()
      .where('id', params.id)
      .preload('creator')
      .preload('club')
      .preload('players')
      .firstOrFail()

    return response.status(200).json({
      status: 'success',
      message: 'Match récupéré avec succès',
      data: match,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, auth }: HttpContext) {
    const match = await Match.findOrFail(params.id)

    // Vérifier si l'utilisateur est le créateur du match
    if (match.creatorId !== auth.user!.id) {
      return response.status(403).json({
        status: 'error',
        message: "Vous n'êtes pas autorisé à modifier ce match",
      })
    }

    const matchData = request.only([
      'date',
      'status',
      'isBooked',
      'price',
      'playersMax',
      'duration',
      'courtNumber',
      'level',
      'clubId',
    ])

    await match.merge(matchData).save()

    // Recharger les relations
    await match.refresh()
    await match.load('creator')
    await match.load('club')
    await match.load('players')

    return response.status(200).json({
      status: 'success',
      message: 'Match mis à jour avec succès',
      data: match,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, response, auth }: HttpContext) {
    const match = await Match.findOrFail(params.id)

    // Vérifier si l'utilisateur est le créateur du match
    if (match.creatorId !== auth.user!.id) {
      return response.status(403).json({
        status: 'error',
        message: "Vous n'êtes pas autorisé à supprimer ce match",
      })
    }

    await match.delete()

    return response.status(204)
  }

  /**
   * Join a match
   */
  async join({ params, request, response, auth }: HttpContext) {
    const user = auth.user!
    const match = await Match.findOrFail(params.id)

    // Vérifier si le match est complet
    if (match.playersCount >= match.playersMax) {
      return response.status(400).json({
        status: 'error',
        message: 'Ce match est déjà complet',
      })
    }

    // Vérifier si l'utilisateur est déjà dans le match
    const isAlreadyJoined = await match.related('players').query().where('user_id', user.id).first()

    if (isAlreadyJoined) {
      return response.status(400).json({
        status: 'error',
        message: 'Vous participez déjà à ce match',
      })
    }

    // Déterminer l'équipe (A ou B) en fonction du nombre actuel de joueurs
    const { team } = request.only(['team'])

    // Ajouter l'utilisateur au match
    await match.related('players').attach({
      [user.id]: {
        team: team || 'A', // Utiliser l'équipe fournie ou A par défaut
        elo_before: 0, // À ajuster selon votre logique d'ELO
        elo_after: 0,
        score: 0,
      },
    })

    // Incrémenter le nombre de joueurs
    match.playersCount += 1
    await match.save()

    // Recharger les relations
    await match.refresh()
    await match.load('creator')
    await match.load('club')
    await match.load('players')

    return response.status(200).json({
      status: 'success',
      message: 'Vous avez rejoint le match avec succès',
      data: match,
    })
  }

  /**
   * Leave a match
   */
  async leave({ params, response, auth }: HttpContext) {
    const user = auth.user!
    const match = await Match.findOrFail(params.id)

    // Vérifier si l'utilisateur est le créateur du match
    if (match.creatorId === user.id) {
      return response.status(400).json({
        status: 'error',
        message: 'Le créateur ne peut pas quitter le match, vous devez le supprimer',
      })
    }

    // Vérifier si l'utilisateur est dans le match
    const isJoined = await match.related('players').query().where('user_id', user.id).first()

    if (!isJoined) {
      return response.status(400).json({
        status: 'error',
        message: 'Vous ne participez pas à ce match',
      })
    }

    // Retirer l'utilisateur du match
    await match.related('players').detach([user.id])

    // Décrémenter le nombre de joueurs
    match.playersCount -= 1
    await match.save()

    // Recharger les relations
    await match.refresh()
    await match.load('creator')
    await match.load('club')
    await match.load('players')

    return response.status(200).json({
      status: 'success',
      message: 'Vous avez quitté le match avec succès',
      data: match,
    })
  }
}
