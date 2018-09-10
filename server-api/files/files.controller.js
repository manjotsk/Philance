'use strict';

exports.filesUpload = (req, res, next) => {
    console.log(req.file)
    res.status(200).send({message:req.file.filename})
}