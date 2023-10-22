<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import Todo from './components/Todo.svelte';
	import Done from './components/Done.svelte';
	import { fly } from 'svelte/transition';
	import todos from '$lib/stores/todo.store';
	import AddTodo from './components/AddTodo.svelte';
</script>

<main class="p-2">
	<Tabs.Root value="todo">
		<Tabs.List class="grid w-full grid-cols-2 grid-rows-1 h-12">
			<Tabs.Trigger class="h-full" value="todo">Todo</Tabs.Trigger>
			<Tabs.Trigger class="h-full" value="done">Done</Tabs.Trigger>
		</Tabs.List>
		<div class="my-4">
			<Tabs.Content value="todo">
				<AddTodo/>
				{#each $todos.values() as todo (todo.id)}
					{#if !todo.complete}
						<div class="my-2" out:fly={{ x: 200 }}>
							<Todo {todo} />
						</div>
					{/if}
				{/each}
			</Tabs.Content>
			<Tabs.Content value="done">
				{#each $todos.values() as todo}
					{#if todo.complete}
						<div class="wrapper my-2" out:fly={{x:-200}}>
							<Done done={todo} />
						</div>
					{/if}
				{/each}
			</Tabs.Content>
		</div>
	</Tabs.Root>
</main>
