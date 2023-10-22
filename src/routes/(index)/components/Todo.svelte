<script lang="ts">
	import type Todo from '$lib/types/Todo.type';
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import Icon from '@iconify/svelte';
	import todos from '$lib/stores/todo.store';
	export let todo: Todo;

	function mark_completed(){
		todos.complete(todo.id)
	}
	function del(){
		todos.delete(todo.id);
	}
</script>

<Card.Root>
	<Collapsible.Root>
		<Card.Header class="pt-3 pb-0">
			<div class="w-full flex justify-between items-center">
				<Card.Title>
					<h1 class="mb-1 leading-[1.25rem]">{todo.title}</h1>
				</Card.Title>
				<div class="actions flex justify-center items-center">
					<Collapsible.Trigger>
						<Button variant="ghost" class="text-2xl">
							<Icon icon="mdi:menu-down" />
						</Button>
					</Collapsible.Trigger>
					<Button variant="ghost" on:click={mark_completed} class="text-xl hover:text-green-500"
						><Icon icon="mdi:done" /></Button
					>
					<Button variant="ghost" on:click={del} class="text-xl hover:text-red-500"
						><Icon icon="mdi:delete" /></Button
					>
				</div>
			</div>
		</Card.Header>
		<Card.Content>
			<Collapsible.Content>
				<Card.Description>
					<p>{todo.desc}</p>
					<ul class="ml-4 mt-3">
						{#each todo.notes as note}
							<li class="list-disc mx-4">{note}</li>
						{/each}
					</ul>
				</Card.Description>
			</Collapsible.Content>
		</Card.Content>
	</Collapsible.Root>
</Card.Root>
