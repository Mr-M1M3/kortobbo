<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import type Todo from '$lib/types/Todo.type';
	import Icon from '@iconify/svelte';
	import todos from "$lib/stores/todo.store";

	let notes: Set<string> = new Set();

    let note_being_edited = '';
    function add_note(){
        if(!note_being_edited){
            return ;
        }
        notes.add(note_being_edited);
        note_being_edited = "";
        notes = notes;
    }
    function delete_note(note: string){
        notes.delete(note);
        notes = notes;
    }
	function add_todo(event_log: SubmitEvent){
		const form_data = new FormData(event_log.target as HTMLFormElement);
		if(!form_data.get('title')){
			return;
		}
		let notes_arr: string[] = [];
		notes.forEach(note => notes_arr.push(note));
		const todo: Todo = {
			title: form_data.get('title') as string,
			id: crypto.randomUUID().slice(0, 8),
			desc: form_data.get('desc') as string,
			notes: [...notes_arr],
			complete: false,
		};
		todos.add(todo);
		notes.clear();
		note_being_edited = "";
		notes = notes;
		(event_log.target as HTMLFormElement).reset();
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class="w-full">
		<Button variant="outline" class="w-full">Add Todo +</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Add a New Todo</Dialog.Title>
		</Dialog.Header>
		<form on:submit={add_todo}>
			<div class="input-label-wrapper">
				<Label for="todo">Task:</Label>
				<Input
					type="text"
					name="title"
					placeholder="Task yet to be done."
					id="todo"
					class="flex-grow"
				/>
			</div>
			<div class="input-label-wrapper">
				<Label for="desc">Brief:</Label>
				<Input
					type="text"
					name="desc"
					placeholder="Short description of your task"
					id="desc"
					class="flex-grow"
				/>
			</div>
			<div>
				<Label for="note">Notes:</Label>
				<ul>
					{#each notes as note (note)}
						<li class="list-disc ml-8">
                            <div class="w-full flex justify-center items-center">
                                <p class="flex-grow">{note}</p>
                                <Button variant="outline" on:click={() => {delete_note(note)}}>
                                    <Icon icon="mdi:delete"/>
                                </Button>
                            </div>
                        </li>
					{/each}
				</ul>
				<div class="mt-2 flex justify-center items-center gap-2">
					<Input class="flex-grow" placeholder="Any Note" id="note" bind:value={note_being_edited}/>
					<Button variant="secondary" on:click={add_note} type="button">+</Button>
				</div>
			</div>
			<Button type="submit" class="mt-4 w-full">Add Todo</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>

<style>
	.input-label-wrapper {
		@apply grid grid-rows-1 items-center my-4;
		grid-template-columns: 0.3fr 0.7fr;
	}
</style>
