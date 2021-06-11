/**
 * @swagger
 * /product:
 *  post:
 *    tags: [Product]
 *    description: Create a new product
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductReq'
 *    responses:
 *      201:
 *        description: The new product
 *        content:
 *          application/json:
 *            $ref: '#/components/schemas/ProductRes'
 *      400:
 *        description: Product creation error
 *        content:
 *          application/json:
 *            type: object
 *            properties:
 *              message
 *            example:
 *              message: Cannot read property "typeName" of undefined
 *
 * /product/{id}:
 *  get:
 *    tags: [Product]
 *    description: Get product by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Product id
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductRes'
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              Product by id:1 not exist
 *
 *  patch:
 *    tags: [Product]
 *    description: Update product by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Product id
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProductReq'
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductRes'
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              Product by id:1 not exist
 *
 *  delete:
 *    tags: [Product]
 *    description: Deleted product by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Product id
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              Product by id:1 deleted
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              Product by id:1 does not exist
 * /products?offset=&limit=:
 *  get:
 *    tags: [Product]
 *    description: Get all products
 *    parameters:
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *          minimum: 0
 *          default: 0
 *          required: false
 *          description: The number of items to skip before starting to collect the result set.
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          minimum: 1
 *          maximum: 100
 *          default: 20
 *          required: false
 *          description: The numbers of items to return.
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Products'
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              Table Products is empty
 * /products:
 *  delete:
 *    tags: [Product]
 *    description: Deleted all product
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              23 product(s) have been deleted
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              Products table is empty
 */
