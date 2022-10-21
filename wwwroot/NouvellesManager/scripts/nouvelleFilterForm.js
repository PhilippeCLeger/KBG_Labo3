class NouvelleFilterForm{
    constructor(
        {
            webAPI, 
            form, 
            filterTitre, 
            filterCategorie, 
            btnSearch,
            onSearchCallBack,
        }
    ){
        this.webAPI = webAPI;
        this.form = form;
        this.filterTitre = filterTitre;
        this.filterCategorie = filterCategorie;
        this.btnSearch = btnSearch;
        this.queryString = this.buildQueryString();
        this.setOnSearch(onSearchCallBack);
    }

    update(){
        const currentValue = this.filterCategorie.val();
        this.webAPI.GET_ALL((lst) => this.fillCategories(lst, currentValue), console.log, "?fields=Categorie");
    }

    setOnSearch(onSearchCallBack){
        this.btnSearch.off("click");
        this.btnSearch.click((e) => {
            this.queryString = this.buildQueryString();
            onSearchCallBack();
        });
    }

    fillCategories(lst, currentValue){
        this.filterCategorie.empty()
        this.filterCategorie.append(`<option value="-1">Toutes les catégories...</option>`);
        for(let obj of lst){
            this.filterCategorie.append(`<option value="${obj.Categorie}">${obj.Categorie}</option>`);
        }  
        this.filterCategorie.val(lst.find((c) => c.Categorie == currentValue) ? currentValue : -1);
    }

    buildQueryString(){
        let queryItems = ["sort=Date,desc"];
        let categoryFilter = this.getCategoryQuery();
        if (!!categoryFilter) queryItems.push(categoryFilter);
        queryItems.push(this.getTitleQuery());
        let queryString = `?${queryItems.join("&")}`;
        return queryString;
    }

    getQueryString(){
        return this.queryString;
    }

    getTitleQuery(){
        return `Titre=*${this.filterTitre.val()}*`
    }

    empty(){
        this.filterCategorie.val(-1);
        this.filterTitre.val("");
        this.queryString = this.buildQueryString();
    }

    getCategoryQuery(){
        let category = this.filterCategorie.val()
        if (category == -1) return null;
        return `Categorie=${category}`;
    }
}