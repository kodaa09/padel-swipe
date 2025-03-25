import Club from '#models/club'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClubsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const clubs = await Club.query()

    return response.status(200).json({
      status: 'success',
      message: 'Liste des clubs récupérée avec succès',
      data: clubs,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const clubData = request.only([
      'name',
      'address',
      'city',
      'zipCode',
      'country',
      'phone',
      'email',
    ])

    const club = await Club.create(clubData)

    return response.status(201).json({
      status: 'success',
      message: 'Club créé avec succès',
      data: club,
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const club = await Club.query().where('id', params.id).firstOrFail()

    return response.status(200).json({
      status: 'success',
      message: 'Club récupéré avec succès',
      data: club,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const club = await Club.findOrFail(params.id)
    const clubData = request.only([
      'name',
      'address',
      'city',
      'zipCode',
      'country',
      'phone',
      'email',
    ])

    await club.merge(clubData).save()

    return response.status(200).json({
      status: 'success',
      message: 'Club mis à jour avec succès',
      data: club,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const club = await Club.findOrFail(params.id)
    await club.delete()

    return response.status(204)
  }
}
