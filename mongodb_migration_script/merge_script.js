const mongodb = require('mongodb')
const client = mongodb.MongoClient
const url = 'mongodb://localhost:27017/my_db'
const customers=require('./m3-customer-data.json')
const customerAddresses=require('./m3-customer-address-data.json')
const async = require('async')

let tasks=[]
const limit = parseInt(process.argv[2],10) || 1000
console.log(limit)

client.connect(url,{useNewUrlParser: true},(error,db)=>{
	if (error) return process.exit(1)
	db1=db
	customers.forEach((customer,index,list)=>{
		customers[index] = Object.assign(customer, customerAddresses[index])

		if (index%limit==0){
			const start = index
			const end = start+limit>customers.length ? customers.length-1 : start+limit
			tasks.push((done)=>{
				db.db('my_db').collection('customers').insert(customers.slice(start,end),(error,results)=>{
					done(error,results)
				})
			})
		}

	})

	const startTime = Date.now()
	async.parallel(tasks,(error,db)=>{
	if (error) return console.error(1)
	const endTime = Date.now()
	console.log(`execution-time ${endTime-startTime}`)
	db1.close()
	})
})