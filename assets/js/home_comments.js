// {
//     let createComment=function(){
//         let newComment=$('.post-comments-form');
//         newComment.submit(function(e){
//             e.preventDefault();
           
            
//             $.ajax({
//                 method:'post',
//                 url:'/comments/create',
//                 // data:newComment.serialize(),
//                 success:function(data){
//                     console.log(data);
//                 },error:function(err){
//                     console.log("----"); 
//                 }
//             })
//         });
//     }

//     createComment();
// }