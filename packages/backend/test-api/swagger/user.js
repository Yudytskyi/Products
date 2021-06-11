/**
 * @swagger
 * /user:
 *  post:
 *    tags: [User]
 *    description: Create a new user
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserReq'
 *    responses:
 *      201:
 *        description: The new user
 *        content:
 *          application/json:
 *            $ref: '#/components/schemas/UserRes'
 *      400:
 *        description: User creation error
 *        content:
 *          application/json:
 *            type: object
 *            properties:
 *              message
 *            example:
 *              message: Cannot read property "typeName" of undefined
 *
 * /user/{id}:
 *  get:
 *    tags: [User]
 *    description: Get user by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: User id
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserRes'
 *      404:
 *        description: User not found
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              User by id:1 not exist
 *
 *  patch:
 *    tags: [User]
 *    description: Update user by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: User id
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserReq'
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserRes'
 *      404:
 *        description: User not found
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              User by id:1 not exist
 *
 *  delete:
 *    tags: [User]
 *    description: Deleted user by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: User id
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              User by id:1 deleted
 *      404:
 *        description: User not found
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              User by id:1 does not exist
 *
 * /users?offset=&limit=:
 *  get:
 *    tags: [User]
 *    description: Get all users
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
 *              $ref: '#/components/schemas/Users'
 *      404:
 *        description: User not found
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              Table Users is empty
 *
 * /users:
 *  delete:
 *    tags: [User]
 *    description: Deleted all user
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              23 user(s) have been deleted
 *      404:
 *        description: User not found
 *        content:
 *          application/json:
 *            type: string
 *            example:
 *              Users table is empty
 */
