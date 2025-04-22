import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ClubsController = () => import('#controllers/clubs_controller')
const AuthController = () => import('#controllers/auth_controller')
const MatchesController = () => import('#controllers/matches_controller')

router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
    router.delete('/logout', [AuthController, 'logout']).use(middleware.auth())
    router.get('/me', [AuthController, 'me']).use(middleware.auth())

    router.get('/clubs', [ClubsController, 'index'])
    router.get('/clubs/:id', [ClubsController, 'show'])
    router.post('/clubs', [ClubsController, 'store'])
    router.put('/clubs/:id', [ClubsController, 'update'])
    // router.delete('/clubs/:id', [ClubsController, 'destroy'])

    router.get('/matches', [MatchesController, 'index'])
    router.get('/matches/:id', [MatchesController, 'show'])
    router.post('/matches', [MatchesController, 'store']).use(middleware.auth())
    router.put('/matches/:id', [MatchesController, 'update']).use(middleware.auth())
    router.delete('/matches/:id', [MatchesController, 'destroy']).use(middleware.auth())
    router.post('/matches/:id/join', [MatchesController, 'join']).use(middleware.auth())
    router.post('/matches/:id/leave', [MatchesController, 'leave']).use(middleware.auth())
  })
  .prefix('/api')
