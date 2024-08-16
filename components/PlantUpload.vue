<template>
	<div class="flex flex-col gap-y-4">
		<div v-if="!plantName" class="col-span-full max-w-7xl mx-auto py-20">
			<h2 class="text-3xl">Upload a Plant Photo</h2>
			<div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
				<div class="text-center">
					<div class="mt-4 flex text-sm leading-6 text-gray-600">
						<label
							for="file-upload"
							class="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
						>
							<span>Upload a file</span>
							<input
								id="file-upload"
								name="file-upload"
								type="file"
								class="sr-only"
								@change="onFileChange"
							/>
						</label>
						<p class="pl-1">or drag and drop</p>
					</div>
					<p v-if="file === null" class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
					<p v-if="file !== null" class="text-xs leading-5 text-gray-600">{{ file.name }}</p>
				</div>
			</div>
			<button
				class="mt-4 rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
				@click="identifyPlant"
			>
				Identify Plant
			</button>
		</div>
		<Status v-if="loading || error"
			><span v-if="loading">Identifying plant...</span> <span v-if="error">{{ error }}</span></Status
		>

		<DetailView
			v-if="plantName"
			:image="plantName.input.images[0]"
			:name="plantName.result.classification.suggestions[0].name"
			:latName="plantName.result.classification.suggestions[0].details.common_names[0]"
		>
			<Detail
				name="probability"
				:description="`${Math.round(
					plantName.result.classification.suggestions[0].probability * 100
				).toString()} %`"
			></Detail>
			<Detail
				name="description"
				:description="plantName.result.classification.suggestions[0].details.description.value"
			></Detail>
			<Detail
				name="watering instructions"
				:description="plantName.result.classification.suggestions[0].details.best_watering"
			></Detail>
			<Detail
				name="ideal location"
				:description="plantName.result.classification.suggestions[0].details.best_light_condition"
			></Detail>
			<Detail
				name="best soil"
				:description="plantName.result.classification.suggestions[0].details.best_soil_type"
			></Detail>
		</DetailView>
	</div>
</template>

<script>
import axios from "axios";
import DetailView from "./DetailView.vue";
import Detail from "./Detail.vue";

export default {
	components: {
		DetailView,
		Detail,
		Status,
	},
	data() {
		return {
			file: null,
			plantName: "",
			loading: false,
			error: null,
		};
	},
	methods: {
		onFileChange(event) {
			this.file = event.target.files[0];
			console.log(this.file);
		},
		async identifyPlant() {
			if (!this.file) {
				this.error = "Please select a file!";
				return;
			}

			this.loading = true;
			this.error = null;

			try {
				const formData = new FormData();
				formData.append("images", this.file);

				const response = await axios.post(
					"https://plant.id/api/v3/identification?details=common_names,url,description,image,synonyms,edible_parts,watering,best_light_condition,best_soil_type,toxicity,best_watering&language=en",
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
							"Api-Key": this.$config.public.VITE_PLANTID_API_KEY,
						},
					}
				);

				if (response.data.result) {
					console.log(response);
					console.log(response.request.response);
					//console.log(JSON.parse(response.request.response.input.images[0]));
					this.plantName = JSON.parse(response.request.response);
				} else {
					console.log(response);
					this.error = "No plant identified. Please try another photo.";
				}
			} catch (err) {
				this.error = `"An error occurred while identifying the plant.": ${err}`;
			} finally {
				this.loading = false;
			}
		},
	},
};
</script>
