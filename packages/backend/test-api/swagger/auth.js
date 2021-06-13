/**
 * @swagger
 * /login:
 *  post:
 *    tags: [Authentication]
 *    description: User authorization in the site.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required: [data]
 *            properties:
 *              data:
 *                type: array
 *                description: Body payload
 *                items:
 *                  type: object
 *                  required: [user]
 *                  properties:
 *                    user:
 *                      type: object
 *                      required: [password, email]
 *                      properties:
 *                        password:
 *                          type: string
 *                          description: User password
 *                        email:
 *                          type: string
 *                          description: User email
 *          example:
 *            data:
 *              - user:
 *                  password: testPassword1
 *                  email: test55@gmail.com
 *
 *    responses:
 *      201:
 *        description: The new user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [data, tokenPair]
 *              properties:
 *                data:
 *                  type: array
 *                  description: Body payload
 *                  items: '#/components/schemas/UserData'
 *                tokenPair:
 *                  type: object
 *            example:
 *              data:
 *                - User:
 *                    id: 1
 *                    firstName: firstName1
 *                    lastName: lastName1
 *                    userName: userName1
 *                    email: firstLast3@test.com
 *                    role: admin
 *                    createAt: 2021-06-12T11:35:06.936Z
 *                    updatedAt: 2021-06-12T11:35:07.936Z
 *              tokenPair:
 *                accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJ1c2VyUm9sZSI6InVzZXIiLCJpYXQiOjE2MjM0ODM2NjgsImV4cCI6MTYyMzQ4NTQ2OH0.XA-yyz0vBmgss397rJ0g53U0Tmh58LstIOyFT6OJwHo
 *                refreshToken: c9712e78-79ed-4086-8512-3aa70a40af9f
 *
 *      403:
 *        description: User creation error
 *        content:
 *          application/json:
 *            type: object
 *            properties:
 *              message
 *            example:
 *              message: 'Incorrect password or email'
 *
 * /signup:
 *  post:
 *    tags: [Authentication]
 *    description: Signup a new user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserReq'
 *    responses:
 *      201:
 *        description: The new user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [data, tokenPair]
 *              properties:
 *                data:
 *                  type: array
 *                  description: Body payload
 *                  items: '#/components/schemas/UserData'
 *                tokenPair:
 *                  type: object
 *            example:
 *              data:
 *                - user:
 *                    id: 1
 *                    firstName: Sergeev
 *                    lastName: Sergey
 *                    userName: Seryoga
 *                    email: sergeev@test.com
 *                    role: admin
 *                    createAt: 2021-06-12T11:35:06.936Z
 *                    updatedAt: 2021-06-12T11:35:06.936Z
 *              tokenPair:
 *                accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJ1c2VyUm9sZSI6InVzZXIiLCJpYXQiOjE2MjM0ODM2NjgsImV4cCI6MTYyMzQ4NTQ2OH0.XA-yyz0vBmgss397rJ0g53U0Tmh58LstIOyFT6OJwHo
 *                refreshToken: c9712e78-79ed-4086-8512-3aa70a40af9f
 *      500:
 *        description: User creation error
 *        content:
 *          application/json:
 *            type: object
 *            properties:
 *              message
 *            example:
 *              message: 'Validation error'
 *
 * /refresh:
 *  post:
 *    tags: [Authentication]
 *    description: Refresh token pare
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            required: [refreshToken]
 *            properties:
 *              refreshToken:
 *                type: string
 *          example:
 *            refreshToken: 829eb453-1331-4f1c-818b-92559866c928
 *    responses:
 *      200:
 *        description: The new user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [data, tokenPair]
 *              properties:
 *                data:
 *                  type: array
 *                  description: Body payload
 *                  items: '#/components/schemas/UserData'
 *                tokenPair:
 *                  type: object
 *            example:
 *              data:
 *                - user:
 *                    id: 1
 *                    firstName: Sergeev
 *                    lastName: Sergey
 *                    userName: Seryoga
 *                    email: sergeev@test.com
 *                    role: admin
 *                    createAt: 2021-06-12T11:35:06.936Z
 *                    updatedAt: 2021-06-12T11:35:06.936Z
 *              tokenPair:
 *                accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJ1c2VyUm9sZSI6InVzZXIiLCJpYXQiOjE2MjM0ODM2NjgsImV4cCI6MTYyMzQ4NTQ2OH0.XA-yyz0vBmgss397rJ0g53U0Tmh58LstIOyFT6OJwHo
 *                refreshToken: c9712e78-79ed-4086-8512-3aa70a40af9f
 *      401:
 *        description: User creation error
 *        content:
 *          application/json:
 *            type: object
 *            properties:
 *              message
 *            example:
 *              message: 'Unauthorized'
 */
