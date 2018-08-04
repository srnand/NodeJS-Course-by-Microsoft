module.exports= {
	getPosts(request,response){
		response.status(200).send(request.store.posts)
	},

	postPost(request,response){
		let post = request.body
		let id = request.store.posts.length
		request.store.posts.push(post)
		response.status(201).send({id:id})
	},
	
	putPost(request,response){
		request.store.posts[request.params.postId]=Object.assign(request.store.posts[request.params.postId], request.body)
		response.status(200).send(request.store.posts[request.params.postId])
	},

	deletePost(request,response){
		request.store.posts.splice(request.params.postId,1)
		response.status(204).send()
	}
}