import type Todo from '$lib/types/Todo.type';
import { json_to_map, map_to_json } from '$lib/utils/map-json-converter';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
let stored_data = {};
if(browser){
    stored_data = JSON.parse(localStorage.getItem('todos') ?? '{}');
}

const { subscribe, update, set } = writable<Map<string, Todo>>(json_to_map(stored_data));

export const todos = {
	subscribe,
    set,
    update,
	add(todo: Todo) {
        update(todos => {
            todos.set(todo.id, todo);
            return todos;
        });
    },
	complete(id: string) {
        update(todos => {
            const selected_todo = todos.get(id);
            if(selected_todo){
                selected_todo.complete = true;
                todos.set(id, {...selected_todo});
            }
            return todos;
        })
	},
    delete(id: string){
        update(todos => {
            todos.delete(id);
            return todos;
        });
    }
};

todos.subscribe((val) => {
    if(browser){
        localStorage.setItem('todos', JSON.stringify(map_to_json(val ?? new Map())));
    }
});


export default todos;