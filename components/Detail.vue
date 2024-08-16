<template>
	<div class="border-t border-gray-200 pt-4">
		<dt class="font-medium text-gray-900">{{ name }}</dt>
		<dd class="mt-2 text-sm text-gray-500">{{ description }}</dd>
	</div>
</template>

<script setup>
const props = defineProps({
	name: String,
	description: String,
});
</script>
