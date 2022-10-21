class NouvelleEditForm{
    constructor(
        {
            modal,
            form,
            label,
            webAPI, 
            btnConfirmAdd,
            btnCancelAdd,
            addTitre,
            addDate,
            addCategorie,
            addImageUrl,
            addTexte,
            onEditCallback=() => null,
            onError=() => null,
        }
    ){
        this.modal = modal;
        this.form = form;
        this.label = label
        this.webAPI = webAPI;
        this.btnConfirmAdd = btnConfirmAdd;
        this.btnCancelAdd = btnCancelAdd;
        this.addTitre = addTitre;
        this.addDate = addDate;
        this.addCategorie = addCategorie;
        this.addImageUrl = addImageUrl;
        this.addTexte = addTexte;
        this.oldNouvelle = null;
        this.onEditCallback = onEditCallback;
        this.onError = onError;
        this.date = null;
        this.btnConfirmAdd.off("click");
        this.btnConfirmAdd.click(() => this.form.submit());
    }

    validateData(){
        return true;
    }

    editNouvelle(id){
        this.label.text("Modifier la nouvelle");
        this.form.off("submit");
        this.form.submit((e) => {
            e.preventDefault();
            if(this.form.get(0).reportValidity()){
                this.webAPI.PUT(this.getNouvelle(), () => {
                    this.empty();
                    this.modal.modal("hide");
                    this.onEditCallback();
                }, this.onError);
            }
        });
        this.webAPI.GET_ID(id, (data) => {
            this.oldNouvelle = data;
            this.fillNouvelle(data);
            this.modal.modal("show");
        }, console.log);
    }

    addNouvelle(){
        this.label.text("Ajouter une nouvelle");
        this.form.off("submit");
        this.form.submit((e) => {
            e.preventDefault();
            if(this.form.get(0).reportValidity()){
                this.webAPI.POST(this.getNouvelle(), (data) => {
                    this.empty();
                    this.modal.modal("hide");
                    this.onEditCallback();
                }, this.onError);
            }
        });
        this.empty();
        this.modal.modal("show");
    }

    submitAdd(e){
        console.log(this.modal);
        this.modal.off("submit");
        this.modal.submit((e) => {
            const $this = $(this);
            if(this.get(0).reportValidity()){
                this.webAPI.POST(this.getNouvelle(), (data) => {
                    this.empty();
                    this.modal.modal("hide");
                    this.onEditCallback();
                }, console.log)
            }
        });
    }

    fillNouvelle(nouvelle){
        this.addTitre.val(nouvelle.Titre);
        this.addCategorie.val(nouvelle.Categorie);
        this.date = nouvelle.Date;
        this.addDate.val(displayDate(new Date(nouvelle.Date)));
        this.addImageUrl.val(nouvelle.ImageUrl);
        this.addTexte.val(nouvelle.Texte);
    }

    empty(){
        this.addTitre.val("");
        this.addCategorie.val("");
        this.addDate.val("");
        this.addImageUrl.val("");
        this.addTexte.val("");
        this.date = null;
    }

    getNouvelle(){
        return {
            Id: !!this.oldNouvelle ? this.oldNouvelle.Id : -1,
            Categorie: this.addCategorie.val(),
            Titre: this.addTitre.val(),
            Texte: this.addTexte.val(),
            ImageUrl: this.addImageUrl.val(),
            Date: this.getDate()
        };
    }

    getDate(){
        return !!this.date ? this.date : Date.now();
        // try
        // {
        //     return parseDate(this.addDate.val()).getTime();
        // }catch (err){
        //     return Date.now();
        // }
    }
}