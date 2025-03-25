import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.only(['email', 'password', 'firstname', 'lastname', 'level', 'phone'])

    if (await User.findBy('email', data.email)) {
      return response.status(400).json({
        status: 'error',
        message: 'Un utilisateur avec cet email existe déjà',
      })
    }

    const user = await User.create(data)
    const token = await User.accessTokens.create(user)

    return response.status(200).json({
      status: 'success',
      message: 'Utilisateur créé avec succès',
      token,
      user,
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.status(200).json({
      status: 'success',
      message: 'Connexion réussie',
      token,
      user,
    })
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
  }

  async me({ auth, response }: HttpContext) {
    const res = await auth.check()

    if (!res) {
      return response.status(401).json({
        status: 'error',
        message: 'Unauthorized',
      })
    }

    return response.status(200).json({
      status: 'success',
      message: 'Utilisateur connecté',
      user: auth.user,
    })
  }
}
