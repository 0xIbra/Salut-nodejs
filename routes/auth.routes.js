const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth.controller')
const passport = require('passport')
const { check } = require('express-validator/check')

router.post('/register', [
    check('first_name').exists().withMessage('Merci de fournir un prenom').isLength({min: 2}).withMessage('Le prenom doit contenir au moins 2 caractères'),
    check('last_name').exists().withMessage('Merci de fournir un nom').isLength({min: 3}).withMessage('Le nom doit contenir au moins 3 caractères'),
    check('email').exists().withMessage('Merci de fournir une adresse email').isEmail().withMessage('Merci de fournir une adresse email valide'),
    check('password').exists().withMessage('Merci de fournir un mot de passe').isLength({min: 6}).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    
], AuthController.register)

router.post('/login', [
    check('email').exists().withMessage('L\'adresse email n\'a pas été trouvée').isEmail().withMessage('L\'adresse email est invalide'),
    check('password').exists().withMessage('Le mot de passe n\'a pas été trouvé').isLength({min: 6}).withMessage('Le mot de passe doit contenir au moins 6 caractères')
], AuthController.login)

router.get('/confirm/:token', check('token').exists().withMessage('Merci de fournir le token de confirmation'), AuthController.confirm)

module.exports = router