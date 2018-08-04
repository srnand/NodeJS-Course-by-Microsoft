module.exports= {
	getComments(request,response){
		response.status(200).send(request.store.posts[request.store.postId].comments)
	},

	postComment(request,response){
		let newComment = request.body
		let comments = request.store.posts[request.store.postId].comments
		let commentId = comments.length
		comments.push(newComment)
		response.status(201).send({commentId:commentId})
	},
	
	putComment(request,response){
		let comments = request.store.posts[request.store.postId].comments
		request.store.posts[request.params.postId].comments[commentId] = Object.assign(request.store.posts[request.params.postId].comments[request.params.commentId], request.body)
		response.status(200).send(request.store.posts[request.params.postId].comments[commentId])
	},

	deleteComment(request,response){
		request.store.posts[request.params.postId].comments.splice(request.params.commentId,1)
		response.status(204).send()
	}
}