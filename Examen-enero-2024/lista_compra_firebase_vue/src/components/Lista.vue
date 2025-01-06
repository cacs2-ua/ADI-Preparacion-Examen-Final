<script setup>
import Item from './Item.vue';

let props = defineProps(["items"])
// MODIFICADO: Añadimos la emisión de "update_item_name"
defineEmits(["delete_item", "switch_item", "update_item_name"])
</script>

<template>
  <ul>
    <li v-for="i in items" :key="i.id">
      <item v-bind="i"
      @delete_item="$emit('delete_item', $event)"
      @switch_item="$emit('switch_item', $event)"
      @update_item_name="$emit('update_item_name', $event)">
    </item>
    </li>
  </ul>
</template>
