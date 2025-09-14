/**
 * @swagger
 *  tags:
 *      name: Option
 *      description : Option moudle and routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateOption:
 *              type: object
 *              required:
 *                  -   title
 *                  -   key
 *                  -   type
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   number
 *                          -   string
 *                          -   boolean
 *                  category:
 *                      type: string
 *                  guide:
 *                      type: string
 *                  enum:
 *                      type: array
 *                      items:
 *                          type: string
 *                  required:
 *                      type: boolean
 *          UpdateOption:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   number
 *                          -   string
 *                          -   boolean
 *                  category:
 *                      type: string
 *                  guide:
 *                      type: string
 *                  enum:
 *                      type: array
 *                      items:
 *                          type: string
 *                  required:
 *                      type: boolean
 */

/**
 * @swagger
 * /option:
 *  post:
 *      summary: create new option
 *      tags:
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateOption"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateOption"
 *      responses:
 *          201:
 *              description : create new option
 */

/**
 * @swagger
 * /option:
 *  get:
 *      summary: get all options
 *      tags:
 *          -   Option
 *      responses:
 *          200:
 *              description: successful
 */

/**
 * @swagger
 * /option/{id}:
 *  get:
 *      summary: get option by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: successful
 */

/**
 * @swagger
 * /option/{id}:
 *  delete:
 *      summary: delete option by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: successful
 */

/**
 * @swagger
 * /option/{id}:
 *  put:
 *      summary: update option by id
 *      tags:
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/UpdateOption"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/UpdateOption"
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: successful
 */

/**
 * @swagger
 * /option/by-category/{categoryId}:
 *  get:
 *      summary: get all options of a category by category id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: categoryId
 *              type: string
 *      responses:
 *          200:
 *              description: successful
 */

/**
 * @swagger
 * /option/by-category/{categorySlug}:
 *  get:
 *      summary: get all options of a category by category slug
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: categorySlug
 *              type: string
 *      responses:
 *          200:
 *              description: successful
 */