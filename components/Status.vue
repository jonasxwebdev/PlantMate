<template>
	<div class="pointer-events-none fixed inset-x-0 top-0 sm:px-6 sm:pb-5 lg:px-8">
		<div
			class="pointer-events-auto flex items-center justify-between gap-x-6 bg-gray-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5"
		>
			<p class="text-sm text-center leading-6 text-white"><slot></slot></p>
		</div>
	</div>
</template>
