{
    // method to submit the form data for new post using ajax
   let createPost=function(){
       let newPostForm=$('#new-post-form');
       newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                // converts form data into json
                data: newPostForm.serialize(),
                success:function(data){
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    // class (delete-post-button) is in newPost
                    deletePost($('.delete-post-button', newPost));
                    new Noty({
                        theme:'relax',
                        text: `Post Published`,
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();
                },error:function(err){
                    console.log(err.responseText);
                }
            })
       });
   }  

   // method to create a post in DOM
   let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
            <p>
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                </small>
                ${post.content}
                <br>
                <small>
                   ${post.user.name}
                </small>
            </p>
            <div class="post-comments">
                    <form action="/comments/create" method="post" class="post-comments-form">
                        <input type="text" name="content"  placeholder="Type here to add comment..." required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment">
                    </form>
        
                    <div id="post-comments-list-${post._id}>">
                    <ul>
                        
                    </ul>
                    </div>
            </div>
        </li>`)
   }

   // method to delete a post from DOM
   let deletePost=function(deleteLink){
       $(deleteLink).click(function(e){
           e.preventDefault();
           $.ajax({
               type:'get',
               // to access the href of a tag of this delete link button
               url:$(deleteLink).prop('href'),
               success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme:'relax',
                        text: `Post deleted`,
                        type:'error',
                        layout:'topRight',
                        timeout:1500
                    }).show();
               },error:function(err){
                   console.log(err.responseText);
               }
           })
       })
   }




   createPost();
}
