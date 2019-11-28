const Product = require('../models/product');
const mongoose = require('mongoose');

exports.get_all_product = (req, res, next) => {

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
}


exports.get_product = (req, res, next) => {
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
}

exports.post_product = (req, res, next) => {

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
}

exports.patch_product = (req, res, next) => {
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
}

exports.delete_product = (req, res, next) => {
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
}