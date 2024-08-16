<template>
	<div class="bg-white">
		<div aria-hidden="true" class="relative">
			<NuxtImg :src="image" alt="" class="h-96 w-full object-cover object-center" />
			<div class="absolute inset-0 bg-gradient-to-t from-white" />
		</div>

		<div class="relative mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
			<div class="mx-auto max-w-2xl text-center lg:max-w-4xl">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ latName }}</h2>
				<p class="mt-4 text-gray-500">
					{{ name }}
				</p>
			</div>

			<dl
				class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8"
			>
				<slot></slot>
			</dl>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	image: String || undefined,
	latName: String,
	name: String,
});
</script>
