<script setup>
import { reactive } from "vue";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import SelectColor from "@/components/SelectColor.vue";
import { DatePicker } from "v-calendar";

const { data, v$ } = useDataForm({
	title: { required },
	location: { required },
	color: { required },
	desc: { required },
	date: {
		value: {
			start: new Date(),
			end: new Date()
		}
	},
	startTime: { value: "00:00" },
	endTime: { value: "00:00" }
});

const onSubmit = () => {};
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="container px-16 py-8 grid grid-cols-2 gap-8">
				<div>
					<h2 class="text-black/90 text-2xl leading-tight mb-16">Buat Agenda</h2>
					<form @submit.prevent="onSubmit">
						<div class="grid grid-cols-1 gap-8 mb-8">
							<div class="form-group">
								<label for="inputTitle">Judul Agenda *</label>
								<input type="text" v-model="v$.title.$model" id="inputTitle">
							</div>
							<div class="form-group">
								<label for="textDesc">Deskripsi *</label>
								<textarea v-model="v$.desc.$model" rows="4"></textarea>
							</div>
							<div class="flex flex-wrap items-start gap-8">
								<div class="grow grid grid-cols-1 gap-8">
									<div class="form-group">
										<label for="inputLocation">Tempat *</label>
										<input type="text" v-model="v$.location.$model" id="inputLocation">
									</div>
									<div class="form-group">
										<label>Waktu *</label>
										<div class="grid grid-cols-[1fr_auto_1fr] gap-2 form-group items-center">
											<input type="time" v-model="v$.startTime.$model">
											<span class="text-gray-500 text-sm">
												<font-awesome-icon icon="fa-solid fa-left-right" />
											</span>
											<input type="time" v-model="v$.endTime.$model">
										</div>
									</div>
									<div class="form-group">
										<label>Warna *</label>
										<SelectColor defaultValue="data.color" @change="value => data.color = value" class="w-[10rem]" />
									</div>
								</div>
								<div class="form-group">
									<label>Tanggal *</label>
									<DatePicker v-model="data.date" is-range />
								</div>
							</div>
						</div>
						<div class="flex justify-end mb-4">
							<button type="submit" class="btn text-white hover-margin bg-primary-700 hover:bg-primary-600">Buat Agenda</button>
						</div>
					</form>
				</div>
			</div>
		</template>
	</BasicLayout>
</template>