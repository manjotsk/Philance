var aws      = require('aws-sdk');
var queueUrl = "https://sqs.us-east-2.amazonaws.com/653688110860/Philance";
var receipt  = "";
    
// Load your AWS credentials and try to instantiate the object.
aws.config.loadFromPath('/home/vagrant/.aws/credentials.json');
aws.config.update({region: 'us-east-2'});
// Instantiate SQS.
var sqs = new aws.SQS();

// Creating a queue.
exports.create=(req, res)=> {
    var params = {
        QueueName: "Philance",
    };
    
    sqs.createQueue(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        } 
    });
}

// Listing our queues.
exports.list=(req, res)=>{
    sqs.listQueues(function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        } 
    });
}

// Sending a message.
// NOTE: Here we need to populate the queue url you want to send to.
// That variable is indicated at the top of app.js.
exports.send=(req, res)=> {
    var params = {
        MessageBody: 'Hello world!',
        // MessageGroupId:"agroupid",
        QueueUrl: queueUrl,
        DelaySeconds: 0,
        // AttributeNames:[
        //     "ContentBasedDeduplication"
        // ]
    };

    sqs.sendMessage(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        } 
    });
}

// Receive a message.
// NOTE: This is a great long polling example. You would want to perform
// this action on some sort of job server so that you can process these
// records. In this example I'm just showing you how to make the call.
// It will then put the message "in flight" and I won't be able to 
// reach that message again until that visibility timeout is done.
exports.recieve=(req, res)=> {
    var params = {
        QueueUrl: queueUrl,
        VisibilityTimeout: 600, // 10 min wait time for anyone else to process.
        // AttributeNames:[
        //     "ContentBasedDeduplication"
        // ]
    };
    
    sqs.receiveMessage(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        } 
    });
}

// Deleting a message.
exports.delete=(req, res)=> {
    var params = {
        QueueUrl: queueUrl,
        ReceiptHandle: receipt
    };
    
    sqs.deleteMessage(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        } 
    });
}
// Deleting a message.
exports.set=(req, res)=> {
    var params = {
        QueueUrl: queueUrl,
        // Attributes:{
        //     'ContentBasedDeduplication':'true'
        // }
        
    };
    
    sqs.setQueueAttributes(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        } 
    });
}

// Purging the entire queue.
exports.purge=(req, res)=> {
    var params = {
        QueueUrl: queueUrl
    };
    
    sqs.purgeQueue(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        } 
    });
}
