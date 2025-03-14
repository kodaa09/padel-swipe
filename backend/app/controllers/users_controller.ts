import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const users = await User.query().preload('matches')

    return response.status(200).json({
      status: 'success',
      message: 'Liste des utilisateurs récupérée avec succès',
      data: users,
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const user = await User.query().where('id', params.id).preload('matches').firstOrFail()

    return response.status(200).json({
      status: 'success',
      message: 'Utilisateur récupéré avec succès',
      data: user,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const userData = request.only(['email', 'password', 'firstname', 'lastname', 'level'])

    await user.merge(userData).save()

    return response.status(200).json({
      status: 'success',
      message: 'Utilisateur mis à jour avec succès',
      data: user,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return response.status(204)
  }
}
