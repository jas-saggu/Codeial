class ToggleLike{
    
    constructor(toggleElement){
        this.toggler=toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        // console.log('$$$$$$$');
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self=this;
            $.ajax({
                type:'Post',
                url: $(self).attr('href'),
            })
            .done(function(data){
                let likeCount=parseInt($(self).attr('data-likes'));
                console.log(data.data.deleted);
                if(data.data.deleted==true){
                    // already liked
                    likeCount-=1;
                }else{
                    // not liked
                    likeCount+=1;
                }
                // updating data-like attr value
                $(self).attr('data-likes',likeCount);
                // represent on html
                $(self).html(`${likeCount} Likes`);
                

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
        })
      
    }
}