const express = require('express');
const multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
const crypto = require("crypto");

const checkAuth = require('../middleware/check-auth');
const UserDataController = require('../controllers/userData');

// const MIME_TYPE_MAP = {
//     'document'
// }

const storage =  new GridFsStorage({
    url: 'mongodb+srv://jacob:2YF2yDfJPxwo4oiE@cluster0-f3tj5.mongodb.net/fullStack',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            console.log(err)
            return reject(err)
          }
          const filename = file.originalname
          const fileInfo = {
            filename: filename,
            bucketName: 'documents',
          }
          console.log(fileInfo)
          resolve(fileInfo)
        })
      })
    },
  })
  
//   const upload = multer({ storage })

// multer.diskStorage({
//     destination: (req, file, cb) => {
//         const isValid = MIME_TYPE_MAP[file.mimetype];
//         let error = new Error('Invalid mime type');
//         if(isValid) {
//             error = null;
//         }
//         cb(error, '');
//     },
//     filename: (req, file, cb) => {
//         const name = file.originalname
//         .toLowerCase()
//         .split(' ')
//         .join('-');
//         const ext = MIME_TYPE_MAP[file.mimetype];
//         cb(null, name + '-' + new Date() + '.' + ext);
//     }
// });

const upload = multer({
    storage: storage
}).single('document');

const router = express.Router();

router.get('/', checkAuth, UserDataController.fetchUserData);

router.post('/', checkAuth, upload, UserDataController.createUserData);

router.put('/', checkAuth, UserDataController.updateUserData);

router.delete('/:id', checkAuth, UserDataController.deleteUserData);

module.exports = router;