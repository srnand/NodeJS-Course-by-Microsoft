const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')

let store = {}
store.accounts=[]

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

app.get('/accounts',(request,response)=>{
	response.status(200).send(store.accounts)
})

app.post('/accounts',(request,response)=>{
	let newAccount = request.body
	let id = store.accounts.length
	store.accounts.push(newAccount)
	response.status(201).send({id:id})
})

app.put('/accounts/:id',(request,response)=>{
	store.accounts[request.params.id]=request.body
	response.status(200).send(store.accounts[request.params.id])
})

app.delete('/accounts/:id',(request,response)=>{
	store.accounts.splice(request.params.id,1)
	response.status(204).send()
})

app.listen(3000)