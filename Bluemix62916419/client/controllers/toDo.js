/*global ko*/
/*globals self: false */
"use strict";
self.tasklist = ko.observableArray([]);
self.taskToAdd = ko.observable("");
// On load show loading indicator
self.isLoading = ko.observable(true);
// On load get all tasklist
loadToDoList();

// Method to Load all tasklist by making call to WEB API GET method
function loadToDoList() {
    $.ajax({
        type: "GET",
        url: "api/todos",
        async: false
    }).done(function (result) {
        // Loading the records in tasklist array to display in UI
        self.tasklist(result.data);
        //Hide the loading indicator
        self.isLoading(false);
    }).fail(function (err) {
    });
}
// The ViewModel where the Templates are initialized
var ToDoViewModel = {
    selectedTemplate: ko.observable("readOnly"),
    selectedMode: ko.observable()
};

// Method to Save the Record (This is used for Edit and Add New Record)
ToDoViewModel.saveTask = function (todo) {
    var todoObj = {};
    todoObj.task_name = todo.task_name;
    //show the loading indicator when the delete operation is called
    self.isLoading(true);
    //Edit the Record
    $.ajax({
        type: "PUT",
        url: "api/todos/" + todo._id,
        data: todoObj,
        async: false
    }).done(function () {
        // Fetch tasklist
        loadToDoList();
        //Hide the loading indicator
        self.isLoading(false);
    }).fail(function () {
        ToDoViewModel.reset();
    });

};

// Method to Delete the Record
ToDoViewModel.deleteTask = function (todo) {
    //show the loading indicator when the delete operation is called
    self.isLoading(true);
    $.ajax({
        type: "DELETE",
        url: "api/todos/" + todo._id,
        async: false
    }).done(function () {
        loadToDoList();
        //Hide the loading indicator
        self.isLoading(false);
    }).fail(function () {
        ToDoViewModel.reset();
    });
};
/**
 * POST api call to insert new task name
 */
ToDoViewModel.addTask = function () {
    //show the loading indicator when the create operation is called
    self.isLoading(true);
    if (self.taskToAdd() !== "") {
        // Adds the task. Writing to the "tasks" observableArray causes any associated UI to update
        var mydata = {'task_name': self.taskToAdd()};
        //Ajax request to create a new task
        $.ajax({
            url: 'api/todos',
            type: 'POST',
            data: mydata,
            async: false
        }).done(function () {
            loadToDoList();
            //Hide the loading indicator
            self.isLoading(false);
        }).fail(function () {
            ToDoViewModel.reset();
        });
        // Clears the text box, because it's bound to the "taskToAdd" observable
        self.taskToAdd("");
    }
};
// Method to decide the Current Template (readonlyTemplate or editTemplate)
ToDoViewModel.currentTemplate = function (tbl) {
    return tbl === this.selectedMode() ? 'editMode' : this.selectedTemplate();
}.bind(ToDoViewModel);

//Function to cancel edit effect
ToDoViewModel.reset = function () {
    loadToDoList();
};
//Knockout view model
ko.applyBindings(ToDoViewModel);

