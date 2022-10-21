const btnConfirmAdd = $("#btnConfirmAdd");
const btnCancelAdd = $("#btnCancelAdd");
const addTitre = $("#addTitre");
const addDate = $("#addDate");
const addCategorie = $("#addCategorie");
const addImageUrl = $("#addImageUrl");
const addTexte = $("#addTexte");

const addFormModal = $("#addFormModal");

class NouvelleListBuilder{

    constructor({webAPI, nouvelleEditForm, deleteNouvelle}){
        this.webAPI = webAPI;
        this.nouvelleEditForm = nouvelleEditForm;
        this.deleteNouvelle = deleteNouvelle;
    }

    buildCard(nouvelle){
        const card = $(`<div class="card mx-auto my-2" data-nouvelle-id="${nouvelle.Id}"></div>`);
        card.append(this.buildOptions(nouvelle));
        card.append(this.buildHeader(nouvelle));
        card.append(`<img src="${nouvelle.ImageUrl}" alt="">`);
        card.append(`<div class="card-body"><p class="card-text">${nouvelle.Texte}</p></div>`);
        return card;
    }
    
    buildHeader(nouvelle){
        return $(
            `<div class="card-header">
            <p class="card-subtitle">${nouvelle.Categorie}</p>
            <h5 class="card-title">${nouvelle.Titre}</h5>
            <p class="card-subtitle">${displayDate(new Date(parseInt(nouvelle.Date)))}</p>
            </div>`);
    }
        
    buildOptions(nouvelle){
        const btnEdit = $(`<i class="fas fa-pen nav-link"></i>`);
        const btnDelete = $(`<i class="fas fa-times-circle nav-link"></i>`)
        btnEdit.click((e) => this.nouvelleEditForm.editNouvelle(nouvelle.Id));
        btnDelete.click((e) => {
            this.deleteNouvelle(nouvelle);
        })
        const options = $(`<div class="options p-1"></div>`);
        options.append(btnEdit);
        options.append(btnDelete);
        return options;
    }
}