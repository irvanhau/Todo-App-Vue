<script setup>
import { computed, defineProps, ref } from 'vue';

import TaskAction from './TaskAction.vue';

const props = defineProps({
    task: Object,
});

const emit = defineEmits(['updated','completed','removed'])

const isEdit = ref(false);
const editingTask = ref(props.task.name);
const completedClass = computed(() => props.task.is_completed ? "completed" : "");

const vFocus = {
    mounted: (el) => el.focus()
};

const updateTask = event => {
    const updateTask = {...props.task, name: event.target.value}
    isEdit.value = false
    emit('updated', updateTask)
};

const undo = () => {
    isEdit.value = false
    editingTask.value = props.task.name
}; 

const markTaskAsCompleted = event => {
    const updateTask = { ...props.task, is_completed: !props.task.is_completed }
    emit('completed', updateTask)
};

const removeTask = event => {
    if (confirm("Are you sure?")){
        emit('removed', props.task)
    }
}
</script>

<template>
    <div>
        <li class="list-group-item py-3">
            <div class="d-flex justify-content-start align-items-center">
                <input class="form-check-input mt-0" 
                    type="checkbox"
                    :class="completedClass" 
                    :checked="task.is_completed" 
                    @change="markTaskAsCompleted"
                />
                <div class="ms-2 flex-grow-1" :class="completedClass" title="Double click the text to edit or remove"
                    @dblclick="isEdit = true">
                    <div class="relative" v-if="isEdit">
                        <input class="editable-task" type="text" v-focus @keyup.esc="undo" @keyup.enter="updateTask"
                            v-model="editingTask" />
                    </div>
                    <span v-else>{{ task.name }}</span>
                </div>
                <!-- <div class="task-date">24 Feb 12:00</div> -->
            </div>
            <TaskAction @edit="isEdit = true" v-show="!isEdit" @remove="removeTask"/>
        </li>
    </div>
</template>