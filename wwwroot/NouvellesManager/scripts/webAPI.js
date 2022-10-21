
class WebAPI{
    constructor(apiBaseURL){
        this.apiBaseURL = apiBaseURL;
    }
    HEAD(successCallBack, errorCallBack) {
        $.ajax({
            url: this.apiBaseURL,
            type: 'HEAD',
            contentType: 'text/plain',
            complete: request => { successCallBack(request.getResponseHeader('ETag')) },
            error: function (jqXHR) { errorCallBack(jqXHR.status) }
        });
    }
    GET_ID(id, successCallBack, errorCallBack) {
        $.ajax({
            url: this.apiBaseURL + "/" + id,
            type: 'GET',
            success: data => { successCallBack(data); },
            error: function (jqXHR) { errorCallBack(jqXHR.status) }
        });
    }
    GET_ALL(successCallBack, errorCallBack, queryString = null) {
        let url = this.apiBaseURL + (queryString ? queryString : "");
        $.ajax({
            url: url,
            type: 'GET',
            success: (data, status, xhr) => { successCallBack(data, xhr.getResponseHeader("ETag")) },
            error: function (jqXHR) { errorCallBack(jqXHR.status) }
        });
    }
    POST(data, successCallBack, errorCallBack) {
        $.ajax({
            url: this.apiBaseURL,
            type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => { successCallBack(data) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
    }
    PUT(data, successCallBack, errorCallBack) {
        $.ajax({
            url: this.apiBaseURL + "/" + data.Id,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: () => { successCallBack() },
            error: function (jqXHR) { errorCallBack(jqXHR.status) }
        });
    }
    DELETE(id, successCallBack, errorCallBack) {
        $.ajax({
            url: this.apiBaseURL + "/" + id,
            type: 'DELETE',
            success: () => { successCallBack() },
            error: function (jqXHR) { errorCallBack(jqXHR.status) }
        });
    }
}