// Initialize express router
let router = require('express').Router();
router.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to My Project!'
    });
});

// Import user controller
var userController = require('../controller/userController');
// Contact routes
router.route('/users')
    .get(userController.index)
    .post(userController.create);
router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);
// Export API routes
module.exports = router;
