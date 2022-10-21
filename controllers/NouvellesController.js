const NouvelleModel = require('../models/nouvelle');
const Repository = require('../models/repository');
module.exports =
    class NouvellesController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext, new Repository(new NouvelleModel()));
        }

        // Overrides Controller.post() to add the current UTC DateTime to data.
        post(data) {
            data.Date = Date.now()
            super.post(data);
        }
    }