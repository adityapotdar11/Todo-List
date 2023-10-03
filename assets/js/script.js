feather.replace();

jQuery(function () {
    jQuery("input,select,textarea")
        .not("[type=submit]")
        .jqBootstrapValidation({
            submitSuccess: function ($form, event) {
                if (event.target.id == "add-todo-form") {
                    submitForm();
                }
            },
        });
});

document
    .getElementById("add-todo-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
    });

function submitForm(){
    
}