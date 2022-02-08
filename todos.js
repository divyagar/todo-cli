const inquirer = require("inquirer");

const todos = [];

const initialChoices = {
    ADD_TODO: 1,
    LIST_TODO: 2,
    UPDATE_TODO: 3,
    DELETE_TODO: 4,
    EXIT: 5,
};

const initialChoicesName = {
    ADD_TODO: "Add todo",
    LIST_TODO: "List todo",
    UPDATE_TODO: "Update todo",
    DELETE_TODO: "Delete todo",
    EXIT: "Exit",
};

const getAnswers = (choice) => {
    let choices = [],
        question = [];

    if (choice == initialChoices.ADD_TODO) {
        question = [
            {
                type: "input",
                name: "newTodo",
                message: "Add description of todo",
            },
        ];
    } else if (choice == initialChoices.LIST_TODO) {
        choices = todos.map((todo, idx) => {
            return {
                name: todo.todo,
                checked: todo.done,
                value: idx + 1,
            };
        });
        question = [
            {
                type: "checkbox",
                name: "listTodo",
                choices: choices,
            },
        ];
    } else if (choice == initialChoices.UPDATE_TODO) {
        choices = todos.map((todo, idx) => {
            return {
                name: todo.todo,
                value: idx + 1,
            };
        });
        question = [
            {
                type: "list",
                name: "todoIdx",
                message: "Select the todo that you want to update",
                choices: choices,
            },
            {
                type: "input",
                name: "todoDesc",
                message: "Enter new description to todo",
            },
        ];
    } else if (choice == initialChoices.DELETE_TODO) {
        choices = todos.map((todo, idx) => {
            return {
                name: todo.todo,
                value: idx + 1,
            };
        });

        question = [
            {
                type: "checkbox",
                name: "todoIdxs",
                message: "Select todos that you want to delete",
                choices: choices,
            },
        ];
    } else if (choice == initialChoices.EXIT) {
        process.exit();
    } else {
        for (const property in initialChoices) {
            choices.push({
                name: initialChoicesName[property],
                value: initialChoices[property],
            });
        }

        question = [
            {
                type: "list",
                name: "choice",
                message: "Choose an option",
                choices: choices,
            },
        ];

    }
    return inquirer.prompt(question);
};

const play = async () => {
    while (true) {
        const choice = (await getAnswers(0))["choice"];
        const answers = await getAnswers(choice);

        if (choice == initialChoices.ADD_TODO) {
            const answer = answers["newTodo"];

            const todo = {
                todo: answer,
                done: false,
            };

            todos.push(todo);
        } else if (choice == initialChoices.LIST_TODO) {
            const doneTodos = answers["listTodo"];
            let totalTodos = todos.length;

            for (let i = 0; i < totalTodos; ++i) {
                if (doneTodos.includes(i + 1)) todos[i].done = true;
                else todos[i].done = false;
            }
        } else if (choice == initialChoices.UPDATE_TODO) {
            todos[answers["todoIdx"] - 1].todo = answers["todoDesc"];
        } else if (choice == initialChoices.DELETE_TODO) {
            const todoIdxs = answers["todoIdxs"];
            const len = todoIdxs.length;

            for (let i = len - 1; i >= 0; --i) todos.splice(todoIdxs[i] - 1, 1);
        } else process.exit();
        console.log();
    }
};

play();
