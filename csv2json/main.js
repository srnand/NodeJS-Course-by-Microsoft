const fs = require('fs')
const path = require('path')

const csvtojson = require('csvtojson')

const csvFilePath = path.join(__dirname,'customer-data.csv')

const convert = ()=>{
	let json=''
	csvtojson().fromFile(csvFilePath).on('data',(chunk)=>{
		json+=chunk.toString('utf8')
	})
	csvtojson().fromFile(csvFilePath).on('done',()=>{
		console.log(json)
		fs.writeFile('customer-data.json',JSON.stringify(json),()=>{})
	})
}
convert()