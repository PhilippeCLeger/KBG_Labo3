class PromptModal{
    constructor(
        {
            dialog,
            title,
            content,
            btnConfirm,
            btnCancel,
            onConfirm=() => null,
            onCancel=() => null,
        }){
        this.dialog = dialog;
        this.title = title;
        this.content = content;
        this.btnConfirm = btnConfirm;
        this.btnCancel = btnCancel;
        this.btnConfirm.click
    }

    setOnConfirm(onConfirm){
        this.btnConfirm.off("click");
        this.btnConfirm.click((e) => {
            this.dialog.modal("hide");
            onConfirm();
        });
    }

    setOnCancel(onCancel){
        this.btnCancel.off("click");
        this.btnConfirm.click((e) => {
            this.dialog.modal("hide");
            onCancel();
        });
    }

    setTitle(title){
        this.title.text(title);
    }

    setPrompt(prompt){
        this.content.text(prompt);
    }

    showPrompt(title, prompt, onConfirm = () => null, onCancel = () => null){
        this.setTitle(title);
        this.setPrompt(prompt);
        this.setOnConfirm(onConfirm);
        this.setOnCancel(onCancel);
        this.dialog.modal("show");
    }


}