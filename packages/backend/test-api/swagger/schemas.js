/**
 * @swagger
 * components:
 *  schemas:
 *    metaData:
 *      required: [countAllItems]
 *      properties:
 *        countAllItems:
 *          type: integer
 *          description: Number of all items
 *        countItemsOnPage:
 *          type: integer
 *          description: Number items on page
 *        page:
 *          type: string
 *          description: page m of n, where m - the number of current page, n - the count all pages
 *        numberFirstItemOnPage:
 *          type: integer
 *          description: The number of the first element on the page
 *      example:
 *        countAllItems: 95
 *        countItemsOnPage: 30
 *        page: '2 of 4'
 *        numberFirstItemOnPage: 31
 *
 *    ProductData:
 *      required: [product, productType, attributes]
 *      properties:
 *        product:
 *          required: [name]
 *          properties:
 *            id:
 *              type: integer
 *              readOnly: true
 *              description: The auto incremented of the product
 *            name:
 *              type: string
 *              description: The product name
 *        productType:
 *          required: [id, typeName]
 *          properties:
 *            id:
 *              type: integer
 *              readOnly: true
 *              description: The auto incremented of the productType
 *            typeName:
 *              type: string
 *              description: Product type name
 *        attributes:
 *          required: [weight, color, price]
 *          properties:
 *            weight:
 *              type: integer
 *              description: Weight of the product
 *            color:
 *              type: string
 *              description: Color of the product
 *            price:
 *              type: float
 *              description: Price of the product
 *            dualSim:
 *              type: boolean
 *              description: The presence of two SIM cards in the Phone. Used only if product type is Phone.
 *            graphicsCard:
 *              type: string
 *              description: The presence of graphics card on the laptop. Used only if product type is Laptop.
 *
 *    ProductReq:
 *      required: [data]
 *      properties:
 *        data:
 *          type: array
 *          description: Body payload
 *          items:
 *            $ref: '#/components/schemas/ProductData'
 *      example:
 *        data:
 *          - {product: { name: swagger311 }, productType: { typeName: laptop }, attributes: { weight: 3311, color: swagger311, price: 311.11, graphicsCard: swagger graphicsCard11}}
 *    ProductRes:
 *      required: [data]
 *      properties:
 *        data:
 *          type: array
 *          description: Body payload
 *          items:
 *            $ref: '#/components/schemas/ProductData'
 *      example:
 *        data:
 *          - {product: {id: 1, name: swagger311 }, productType: { id: 2, typeName: laptop }, attributes: { weight: 3311, color: swagger311, price: 311.11, graphicsCard: swagger graphicsCard11}}
 *
 *    Products:
 *      required: [meta, data]
 *      properties:
 *        meta:
 *          $ref: '#/components/schemas/metaData'
 *        data:
 *          type: array
 *          description: Body payload
 *          items:
 *            $ref: '#/components/schemas/ProductData'
 *      example:
 *        meta: {countAllItems: 95, countItemsOnPage: 30, page: '2 of 4', numberFirstItemOnPage: 31}
 *        data:
 *          - {product: { name: swagger311 }, productType: { typeName: laptop }, attributes: { weight: 3311, color: swagger311, price: 311.11, graphicsCard: swagger graphicsCard11}}
 *          - {product: { name: swagger322 }, productType: { typeName: laptop }, attributes: { weight: 3322, color: swagger322, price: 322.22, graphicsCard: swagger graphicsCard22}}
 *          - {product: { name: swagger333 }, productType: { typeName: laptop }, attributes: { weight: 3333, color: swagger333, price: 333.33, graphicsCard: swagger graphicsCard33}}
 *          - {product: { name: swagger344 }, productType: { typeName: laptop }, attributes: { weight: 3344, color: swagger344, price: 344.44, graphicsCard: swagger graphicsCard44}}
 *
 *    ProductTypeData:
 *      required: [productType]
 *      properties:
 *        productType:
 *          required:
 *            - id
 *            - typeName
 *          properties:
 *            id:
 *              type: integer
 *              readOnly: true
 *              description: The auto incremented of the productType
 *            typeName:
 *              type: string
 *              description: Product type name
 *
 *    ProductTypeReq:
 *      required: [data]
 *      properties:
 *        data:
 *          type: array
 *          description: Body payload
 *          items:
 *            $ref: '#/components/schemas/ProductTypeData'
 *      example:
 *        data:
 *          - {productType: { typeName: laptop }}
 *    ProductTypeRes:
 *      required: [data]
 *      properties:
 *        data:
 *          type: array
 *          description: Body payload
 *          items:
 *            $ref: '#/components/schemas/ProductTypeData'
 *      example:
 *        data:
 *          - {productType: { id: 2, typeName: laptop }}
 *
 *    ProductTypes:
 *      required: [meta, data]
 *      properties:
 *        meta:
 *          $ref: '#/components/schemas/metaData'
 *        data:
 *          type: array
 *          description: Body payload
 *          items:
 *            $ref: '#/components/schemas/ProductTypeData'
 *      example:
 *        meta: {countAllItems: 3, countItemsOnPage: 3, page: '1 of 1', numberFirstItemOnPage: 1}
 *        data:
 *          - {productType: {id: 1, typeName: phone }}
 *          - {productType: {id: 2, typeName: laptop }}
 *          - {productType: {id: 3, typeName: tablet }}
 *
 *    UserData:
 *      required: [user]
 *      properties:
 *        user:
 *          description: The object with user properties
 *          required: [firstName, lastName, userName, email, role]
 *          properties:
 *            id:
 *              type: integer
 *              readOnly: true
 *              description: The auto incremented of the user
 *            firstName:
 *              type: string
 *              description: The first name of the user
 *            lastName:
 *              type: string
 *              description: The last name of the user
 *            userName:
 *              type: string
 *              description: The alias of the user
 *            password:
 *              type: text
 *              writeOnly: true
 *              description: User password
 *            email:
 *              type: string
 *              description: User email
 *            role:
 *              type: string
 *              description: User role
 *
 *    UserReq:
 *      required: [data]
 *      properties:
 *        data:
 *          type: array
 *          description: Body payload
 *          items:
 *            $ref: '#/components/schemas/UserData'
 *      example:
 *        data:
 *          - user:
 *              firstName: Ivanov
 *              lastName: Ivan
 *              userName: Vanya
 *              password: testPassword1
 *              email: ivanov@gmail.com
 *              role: admin}}
 *    UserRes:
 *      required: [data]
 *      properties:
 *        data:
 *          type: array
 *          description: Body payload
 *          items:
 *            $ref: '#/components/schemas/UserData'
 *      example:
 *        data:
 *          - {User: {id: 1, firstName: firstName1, lastName: lastName1, userName: userName1, email: firstLast3@test.com, role: admin}}
 *
 *    Users:
 *      required: [meta, data]
 *      properties:
 *        meta:
 *          $ref: '#/components/schemas/metaData'
 *        data:
 *          type: array
 *          description: Body payload
 *          items:
 *            $ref: '#/components/schemas/UserData'
 *      example:
 *        meta:
 *          countAllItems: 54
 *          countItemsOnPage: 20
 *          page: '1 of 3'
 *          numberFirstItemOnPage: 1
 *        data:
 *          - {User: {id: 1, firstName: firstName1, lastName: lastName1, userName: userName1, email: firstLast3@test.com, role: admin}}
 *          - {User: {id: 2, firstName: firstName2, lastName: lastName2, userName: userName2, email: firstLast2@test.com, role: user}}
 *          - {User: {id: 3, firstName: firstName3, lastName: lastName3, userName: userName3, email: firstLast3@test.com, role: guest}}
 *          - {User: {id: 4, firstName: firstName4, lastName: lastName4, userName: userName4, email: firstLast4@test.com, role: user}}
 *          - {User: {id: 5, firstName: firstName5, lastName: lastName5, userName: userName5, email: firstLast5@test.com, role: guest}}
 *          - {User: {id: 6, firstName: firstName6, lastName: lastName6, userName: userName6, email: firstLast6@test.com, role: user}}
 *
 */
