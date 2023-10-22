<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import type TodoType from "$lib/types/Todo.type";
	import Icon from "@iconify/svelte";
    import todos from "$lib/stores/todo.store";
    export let done: TodoType;

    function del(){
        todos.delete(done.id);
    }
    function undo(){
        todos.update(todo => {
            todo.set(done.id, {...done, complete: false});
            return todo;
        })
    }
</script>

<Card.Root>
    <Card.Header class="p-3">
        <Card.Title class="flex justify-center items-center">
            <p class="flex-grow"><del>{done.title}</del></p>
            <div class="actions flex justify-center items-center gap-1">
                <Button variant="ghost" class="text-xl" on:click={del}><Icon icon="mdi:delete"/></Button>
                <Button variant="ghost" class="text-xl" on:click={undo}><Icon icon="mdi:undo"/></Button>
            </div>
        </Card.Title>
    </Card.Header>
</Card.Root>