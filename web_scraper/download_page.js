const https = require('https')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v1')

const downloadPage = (url = 'https://github.com/srnand')=>{
	console.log('Downloading Page...')
	const fetchPage = (urlF,callback)=>{
		https.get(urlF, (response)=>{
			let buffer=''
			response.on('data',(chunk)=>{
				buffer+=chunk
			})
			response.on('end',()=>{
				callback(null,buffer)
				console.log('Done!')
			})
		}).on('error',(error)=>{
			console.log('error occured',error.message)
			callback(error)
		})
	}

	const folderName = uuid()
	fs.mkdirSync(folderName)
	fetchPage(url,(error,data)=>{
		if (error){
			return console.log(`Error ${error.message}`)
		}
		fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url)
		fs.writeFileSync(path.join(__dirname, folderName, 'file.html'), data)
	})

}
downloadPage(process.argv[2])


