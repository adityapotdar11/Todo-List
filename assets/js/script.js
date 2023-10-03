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
    loadTodoList();
});

document
    .getElementById("add-todo-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
    });

function submitForm() {
    const task = document.getElementById("todo-textbox").value;
    const payload = {
        task: task,
        completed: false,
    };
    if (localStorage.todolist) {
        let localData = JSON.parse(localStorage.todolist);
        localData.push(payload);
        localStorage.todolist = JSON.stringify(localData);
    } else {
        let localData = [];
        localData.push(payload);
        localStorage.todolist = JSON.stringify(localData);
    }
    document.getElementById("todo-textbox").value = "";
    loadTodoList();
    alert("Task added.");
}

function loadTodoList() {
    let html = "There are no tasks.";
    if (localStorage.todolist) {
        let localData = JSON.parse(localStorage.todolist);
        if (localData.length) {
            html = "";
            localData.forEach((element, key) => {
                if (element.completed == true) {
                    html += `<li class="todo-element" id="main-${key}">
                    <span class="checkbox-parent">
                    <input type="checkbox" onchange="toggleComplete('${key}')" checked/>
                    </span>
                    <span class="task-name-parent completed" id="task-name-${key}">${element.task}</span>
                    <span class="task-remove-parent">
                    <a class="remove" onclick="removeTask('${key}')"><i data-feather="x-circle"></i></a>
                    </span>
                    </li>`;
                } else {
                    html += `<li class="todo-element" id="main-${key}">
                    <span class="checkbox-parent">
                    <input type="checkbox" onchange="toggleComplete('${key}')"/>
                    </span>
                    <span class="task-name-parent" id="task-name-${key}">${element.task}</span>
                    <span class="task-remove-parent">
                    <a class="remove" onclick="removeTask('${key}')"><i data-feather="x-circle"></i></a>
                    </span>
                    </li>`;
                }
            });
        }
    }
    document.getElementById("todo-list-ul").innerHTML = html;
    feather.replace();
}

function toggleComplete(taskId) {
    if (localStorage.todolist) {
        let localData = JSON.parse(localStorage.todolist);
        if (localData.length) {
            if (localData[taskId]["completed"]) {
                localData[taskId]["completed"] = false;
                document
                    .getElementById(`task-name-${taskId}`)
                    .classList.remove("completed");
            } else {
                localData[taskId]["completed"] = true;
                document
                    .getElementById(`task-name-${taskId}`)
                    .classList.add("completed");
            }
        }
        localStorage.todolist = JSON.stringify(localData);
    }
}

function removeTask(taskId) {
    if (localStorage.todolist) {
        let localData = JSON.parse(localStorage.todolist);
        if (localData.length) {
            localData.splice(taskId, 1);
        }
        localStorage.todolist = JSON.stringify(localData);
        loadTodoList();
    }
    alert("Task removed.");
}
