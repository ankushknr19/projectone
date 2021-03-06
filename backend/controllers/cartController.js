import pool from '../database/db.js'
import asyncHandler from 'express-async-handler'

// @desc    get cart of a customer
// @route   GET /api/customer/cart
// @access  Private/customer
export const cart = asyncHandler(async (req, res) => {
    try {
        const getCart = await pool.query("SELECT carts.*, products.*, vendors.vendor_name FROM carts JOIN products ON carts.product_id = products.product_id INNER JOIN vendors on products.vendor_id=vendors.vendor_id WHERE customer_id=$1 AND products.is_active ORDER BY carts.created_at ASC ",[req.customer.rows[0].customer_id])   

            res.json(getCart.rows)
    } catch (error) {
        res.status(404).json(error.message)
    }
})


// @desc    Delete a cart item
// @route   DELETE /api/customer/cart/:id
// @access  Private/customer
export const deleteCartItem = asyncHandler(async (req, res) => {
    try {
        const searchDb = await pool.query("SELECT * FROM carts WHERE cart_id=$1",[req.params.id])
        if (searchDb.rows==0) {
            res.status(404)
            throw new Error('Cart item not found')
        } else {
            const deletedCartItem = await pool.query("DELETE FROM carts WHERE cart_id=$1",[req.params.id])

            res.status(201).json({ message: 'Cart item removed' })
        }
    } catch (error) {
        res.status(404).json(error.message)
    }

})



// @desc    add a cart item
// @route   POST /api/customer/cart
// @access  Private/customer
export const addCartItem = async (req, res) => {
    try {
        const searchDb = await pool.query("SELECT * FROM carts WHERE product_id=$1 AND customer_id = $2",
        [
            req.body.product_id,
            req.customer.rows[0].customer_id
        ])

        if (searchDb.rows.length==0) {
            const newCartItem = await pool.query(` INSERT INTO carts (customer_id, product_id, qty )
            VALUES($1,$2,$3) RETURNING * `,
            [
                req.customer.rows[0].customer_id,
                req.body.product_id,
                req.body.qty
            ])
            res.status(201).json(newCartItem.rows[0])
        } 
        else {
            
            const updatedCartItem = await pool.query(`UPDATE carts SET qty=$1 WHERE product_id=$2 RETURNING *`,
            [
                req.body.qty,
                req.body.product_id
            ])

            res.status(201).json(updatedCartItem.rows[0])
        }
            
    }
     catch (error) {
        res.status(404).json(error.message)
    }
}



// @desc    Update a cart item
// @route   PUT /api/customer/cart/:id
// @access  Private/customer
export const updateCartItem = asyncHandler(async (req, res) => {
    try {

        const searchDb = await pool.query("SELECT * FROM carts WHERE product_id=$1 AND customer_id = $2",
        [
            req.body.product_id,
            req.customer.rows[0].customer_id
        ])

        if (searchDb.rows.length==0) {
            res.status(404)
            throw new Error('Cart item not found')
        } 
        else {
            
            const updatedCartItem = await pool.query(`UPDATE carts SET qty=$1 WHERE cart_id=$2 RETURNING *`,
            [
                req.body.qty,
                req.params.id
            ])

            res.status(201).json(updatedCartItem.rows[0])
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
})