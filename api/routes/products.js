const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer  =  require('multer');
const Product = require('../models/product');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


const upload = multer({
    storage  : storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.get('/', (req, res, next) => {

    Product.find()
        .select('_id name price productImage')
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
});

router.post('/', upload.single('productImage'), (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });

    product.save()
        .then(result => {
            res.status(201).json({
                createdProduct: result
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });

});


router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('_id name price productImage')
        .exec()
        .then((data) => {

            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    message: 'Resource not found'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });

});


router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });

});



router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(response => {
            res.status(200).json({
                message: 'Product deleted'
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });

});

module.exports = router;
