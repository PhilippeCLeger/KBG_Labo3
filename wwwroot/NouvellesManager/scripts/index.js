const btnAdd = $("#btnAdd");
const btnShowSearch = $("#btnShowSearch");
const btnSearch = $("#btnSearch");
const filterForm = $("#filterForm");
const scrollContainer = $("main");
const contentContainer = $("#contentContainer");
const apiBaseURL = "http://localhost:5000/api/nouvelles";
// const listContainer = $("main>.contentContainer");
const nouvellesParGet = 5;
let currentIndex = 0;
let ETag = null;

const webAPI = new WebAPI(apiBaseURL);
const nouvelleEditForm = new NouvelleEditForm(
    {
        webAPI: webAPI,
        modal: $("#addFormModal"),
        form: $("#addForm"),
        label: $("#addFormModalLabel"),
        btnConfirmAdd: $("#btnConfirmAdd"),
        btnCancelAdd: $("#btnCancelAdd"),
        addTitre: $("#addTitre"),
        addDate: $("#addDate"),
        addCategorie: $("#addCategorie"),
        addImageUrl: $("#addImageUrl"),
        addTexte: $("#addTexte"),
        onEditCallback: () => update(true)
    });
console.log(nouvelleEditForm);
const promptModal = new PromptModal({
        dialog: $("#promptModal"),
        title: $("#promptFormModalLabel"),
        content: $("#prompt-content"),
        btnConfirm: $("#btnConfirmPrompt"),
        btnCancel: $("#btnCancelPrompt"),
    });

const nouvelleListBuilder = new NouvelleListBuilder(
    {webAPI: webAPI, nouvelleEditForm: nouvelleEditForm, deleteNouvelle: deleteNouvelle});

const nouvelleFilterForm = new NouvelleFilterForm(
    {
        webAPI: webAPI,
        form: $("#filterFormCollapse"),
        filterTitre: $("#filterTitre"),
        filterCategorie: $("#filterCategorie"),
        btnSearch: $("#btnSearch"),
        onSearchCallBack: () => {
            currentIndex = 0;
            update(true);
        }
    });


btnAdd.click((e) => nouvelleEditForm.addNouvelle());
btnShowSearch.click((e) => {
    nouvelleFilterForm.empty();
    nouvelleFilterForm.form.toggleClass("collapse");
    update(true);
})

scrollContainer.scroll(() => {
    if(scrollContainer.scrollTop() + scrollContainer.innerHeight() >= contentContainer.height()){
        console.log("scrollbottom!!!");
        getNextNouvelle();
    }
});



function update(forceUpdate = false){
    webAPI.HEAD((newETag) => {
        if(ETag == newETag && !forceUpdate) return;
        ETag = newETag;
        loadNouvelles(currentIndex < 5 ? 5 : currentIndex);
    }, console.log)
}

function loadNouvelles(limit){
    webAPI.GET_ALL((data) => {
        contentContainer.empty();
        for(nouvelle of data){
            contentContainer.append(nouvelleListBuilder.buildCard(nouvelle));
        }
        currentIndex = data.length;
    }, console.log, `${nouvelleFilterForm.getQueryString()}&limit=${limit}`);
    nouvelleFilterForm.update();
}

function getNextNouvelle(){
    const offset = currentIndex;
    const limit = 1;
    const queryString = `${nouvelleFilterForm.getQueryString()}&limit=${limit}&offset=${offset}`
    console.log(queryString);
    webAPI.GET_ALL((data) => {
        // contentContainer.empty();
        console.log(data);
        for(nouvelle of data){
            contentContainer.append(nouvelleListBuilder.buildCard(nouvelle));
        }
        currentIndex += data.length;
    }, console.log, queryString);
}

function deleteNouvelle(nouvelle){
    promptModal.showPrompt("Attention!", `Supprimer la nouvelle ${nouvelle.Titre} ?`,
    (e) => {
        console.log(`DELETE: ${nouvelle.Id}`);
        webAPI.DELETE(nouvelle.Id, () => update(true), console.log);
    });
}

// function 

update();
// nouvelleFilterForm.setOnSearch(() => update(true));
// nouvelleEditForm.setOnEdit(() => update(true));
setInterval(update, 5000);