const Model = require('./model');
module.exports =
    class Nouvelle extends Model {
        constructor() {
            super();
            this.Date = Date.now();
            this.Categorie = "";
            this.Titre = "";
            this.Texte = "";
            this.ImageUrl = "";

            this.addValidator('Categorie', 'string');
            this.addValidator('Titre', 'string');
            this.addValidator('Texte', 'string');
            this.addValidator('ImageUrl', 'url');
            this.addValidator('Date', 'integer');
        }
    }