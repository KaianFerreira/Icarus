import express from 'express'
import Joi from 'joi'
import requireAuth from '../config/auth/requireAuth.mjs'
import {
  getAllAssigned,
  getUser,
  get,
  getAll,
  create,
  update,
  remove,
  assign
} from './model.mjs'

const router = express.Router()

router.get('/', requireAuth(), async (req, res) => {
  try {
    console.log('GET /note')
    // Validate request
    const notes = await getAll()
    res.send(notes)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/assigned', requireAuth(), async (req, res) => {
  try {
    console.log('GET /note/assigned')
    const notes = await getAllAssigned()
    res.send(notes)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error'})
  }
})

router.get('/user/:user', requireAuth('user'), async (req, res) => {
  try {
    console.log('GET /note/user/:user')
    const schema = Joi.object().keys({
      user: Joi.number().integer().required()
    })
    const { value, error } = schema.validate(req.params)
    if (error) {
      console.log(error.details[0].message)
      return res.status(400).send({ error: 'Validation error', fields: ['user'] })
    }
    const note = await getUser(value.user)
    res.send(note)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error'})
  }
})

router.get('/:id', requireAuth('user'), async (req, res) => {
  try {
    console.log('GET /note/:id')
    const schema = Joi.object().keys({
      id: Joi.number().integer().required()
    })
    const { value, error } = schema.validate(req.params)
    if (error) {
      console.log(error.details[0].message)
      return res.status(400).send({ error: 'Validation error', fields: ['id'] })
    }
    const note = await get(value.id)
    res.send(note)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error'})
  }
})

// Check if user exists
router.post('/',  requireAuth('user'), async (req, res) => {
  try {
    console.log('POST /note')
    const schema = Joi.object().options({ abortEarly: false }).keys({
      title: Joi.string().required(),
      subtitle: Joi.string().required(),
      text: Joi.string().required(),
    })
    // Validate request
    const { value, error } = schema.validate(req.body)
    if (error) {
      console.log(error.details[0].message)
      return res.status(400).send({ error: 'Validation error', fields: [...error.details.map(x => x.path[0])] })
    }
    value.user = req.user.id
    const note = await create(value)
    res.send(note)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', requireAuth('user'), async (req, res) => {
  try {
    console.log('PUT /note/:id')
    // Validate request
    const paramsSchema = Joi.object().keys({
      id: Joi.number().integer().required()
    })
    const param = paramsSchema.validate(req.params)

    if (param.error) {
      console.error(param.error.details[0].message)
      return res.status(400).send({ error: 'Validation error', fields: ['id'] })
    }
    const bodySchema =Joi.object().options({abortEarly: false}).keys({
      title: Joi.string().required(),
      subtitle: Joi.string().required(),
      text: Joi.string().required(),
    })
    const body = bodySchema.validate(req.body)

    if (body.error) {
      console.log(body.error.details[0].message)
      return res.status(400).send({ error: 'Validation error', fields: [...body.error.details.map(x => x.path[0])] })
    }
    const note = await update(param.value.id, body.value)
    return res.send(note)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/assign/:id/:assign', requireAuth('admin'), async (req, res) => {
  try {
    console.log('PUT /note/assign/:id/:assign')
    // Validate request
    const schema = Joi.object().keys({
      id: Joi.number().integer().required(),
      assign: Joi.boolean().required()
    })
    const { value, error} = schema.validate(req.params)

    if (error) {
      console.error(error.details[0].message)
      return res.status(400).send({ error: 'Validation error', fields: ['id'] })
    }
    await assign(value.id, value.assign)
    return res.send(true)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.delete('/:id', requireAuth(), async (req, res) => {
  try {
    console.log('DELETE /note/:id')
    const schema = Joi.object().keys({
      id: Joi.number().integer().required()
    })
    const { value, error } = schema.validate(req.params)
    if (error) {
      console.log(error.details[0].message)
      return res.status(400).send({ error: 'Validation error', fields: ['id'] })
    }
    await remove(value.id)
    res.send(true)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error'})
  }
})

export default router
