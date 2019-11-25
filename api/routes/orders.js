const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /orders'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /orders'
    });
});


router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;

    res.status(200).json({
        message: 'order /GET/{id}',
        id: id
    });

});


router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;

    res.status(200).json({
        message: 'order /DELETE/{id}',
        id: id
    })
});

module.exports = router;
