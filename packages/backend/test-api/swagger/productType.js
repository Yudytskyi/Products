/**
 * @swagger
 * /productType:
 *  post:
 *    tags: [ProductType]
 *    description: Create a new productType
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProductTypeReq'
 *    responses:
 *      201:
 *        description: The new productType
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductTypeRes'
 *      400:
 *        description: ProductType creation error
 *        content:
 *          application/json:
 *            type: object
 *            properties:
 *              message
 *            example:
 *              message: 'data[0].productType.typeName must be one of the following values: phone, tablet, laptop'
 *
 * /productType/{id}:
 *  get:
 *    tags: [ProductType]
 *    description: Get productType by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ProductType id
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductTypeRes'
 *      404:
 *        description: ProductType not found
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              ProductType by id:1 not exist
 *
 *  patch:
 *    tags: [ProductType]
 *    description: Update productType by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ProductType id
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProductTypeReq'
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductTypeRes'
 *      404:
 *        description: ProductType not found
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              ProductType by id:1 not exist
 *
 *  delete:
 *    tags: [ProductType]
 *    description: Deleted productType by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ProductType id
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              ProductType by id:1 deleted
 *      404:
 *        description: ProductType not found
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              ProductType by id:1 does not exist
 * /productTypes?offset=&limit=:
 *  get:
 *    tags: [ProductType]
 *    description: Get all productTypes
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
 *              $ref: '#/components/schemas/ProductTypes'
 *      404:
 *        description: ProductType not found
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              Table ProductTypes is empty
 * /productTypes:
 *  delete:
 *    tags: [ProductType]
 *    description: Deleted all productType
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              3 productType(s) have been deleted
 *      404:
 *        description: ProductType not found
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              ProductTypes table is empty
 */
