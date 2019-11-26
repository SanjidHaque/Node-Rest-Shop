const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');


router.get('/', (req, res, next) => {

    Product.find()
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

router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
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
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });

});

module.exports = router;
