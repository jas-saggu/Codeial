// why worker? going to send those emails for us

const queue=require('../config/kue');
const commentsMailer= require('../mailers/comments_mailer');

// process func tells the worker whenver a new task is added to queue, you need to run the code inside this process func

queue.process('emails',function(job,done){
    console.log('emails worker is processing a job ',job.data);

    commentsMailer.newComment(job.data);

    done();
});