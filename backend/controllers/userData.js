const UserData = require('../model/userData');

exports.fetchUserData = (req, res, next) => {
    if (Object.keys(req.query).length === 0) {
        UserData.find({creator: req.userData.userId})
            .then(documents => {
                res.status(200).json(documents);
            })
            .catch(error => {
                console.log(error);
                res.json(error)
            });
    } else {
        let queryCond = [];
        for (let key in req.query) {
            if (req.query[key] !== '') {
                if(key === 'publishedDate' || key === 'acceptedDate'){
                    queryCond.push({ [key]: {"$gte": new Date(req.query[key])}});
                }
                else if(key !== 'grade'  && key !== 'keywords') {
                    queryCond.push({ [key]: { '$regex': req.query[key], '$options': 'i' } });
                }else{
                    queryCond.push({ [key]:  req.query[key] });
                }
                    
            }
        }
        console.log(queryCond)
        UserData.find({ $and: queryCond, creator: req.userData.userId })
            .then(documents => {
                res.status(200).json(documents);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json(error)
            });
    }
}

exports.createUserData =  (req, res, next) => {
    console.log(req.body)
    const userData = new UserData({
        title: req.body.title,
        keywords: req.body.keywords,
        module: req.body.module,
        publishedDate: req.body.publishedDate,
        acceptedDate: req.body.acceptedDate,
        grade: req.body.grade,
        teacher: req.body.teacher,
        creator: req.userData.userId
    });
    userData.save().then(() => {
        res.status(200).json({
            userId: userData._id
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error)
    });
}

exports.updateUserData = (req, res, next) => {
    const userData = new UserData({
        preName: req.body.preName,
        name: req.body.name,
        email: req.body.email,
        score: req.body.score,
        _id: req.body.id
    });
    UserData.updateOne({ _id: userData._id, creator: req.userData.userId }, userData).then((resp) => {
        if(resp.n > 0) {
            res.status(200).json({
                userId: userData._id
            })
        }else{
            res.status(401).json({
                message: 'User not authorized'
            })
        }
    });
}

exports.deleteUserData = (req, res, next) => {
    console.log(req.params.id);
    UserData.deleteOne({ _id: req.params.id,  creator: req.userData.userId })
        .then((resp) => {
            if(resp.n > 0) {
                res.status(200).json({
                    message: 'Post Deleted`'
                })
            }else{
                res.status(401).json({
                    message: 'User not authorized'
                })
            }
        })
        .catch()
}