const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');


router.get('/', (req, res, next) => {
    Order.find()
        .select('_id product quantity')
        .populate('product', 'name')
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
    Product.findById(req.body.productId)
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    message: 'Resource not found'
                });
            }

            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });

            return order.save();

        })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });

});


router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .select('_id product quantity')
        .populate('product')
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


router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;

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
