<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useContactStore } from "@/stores/contact";
import { useViewStore } from "@/stores/view";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import SwitchToggle from "@/components/ui/SwitchToggle.vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import LoadingLine from "@/components/ui/LoadingLine.vue";
import ButtonBack from "@/components/ButtonBack.vue";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";

const emit = defineEmits(["cancel"]);
const contactStore = useContactStore();
const isMember = ref(true);

const pimpinanItem = ["Ketua", "Wakil Ketua", "Anggota"];
const badanItem = ["Ketua", "Wakil Ketua", "Anggota", "Bukan Anggota"];
const fraksiItem = ["Penasehat", "Ketua", "Wakil Ketua", "Sekretaris", "Bendahara", "Wakil Bendahara", "Wakil Sekretaris", "Anggota"];
const komisiItem = ["Ketua", "Wakil Ketua", "Sekretaris", "Anggota", "Bukan Anggota"];

const { data, v$ } = useDataForm({
	nama: { required },
	noHp: { required },
	isJkelP: { value: false },
	tmpLahir: {},
	alamat: {},
	fraksiId: {},
	komisiId: {},
	pimpinanDewan: { value: pimpinanItem[pimpinanItem.length - 1] },
	kedudukanFraksi: { value: fraksiItem[fraksiItem.length - 1] },
	kedudukanKomisi: { value: komisiItem[komisiItem.length - 1] },
	kedudukanBadanMusyawarah: { value: badanItem[badanItem.length - 1] },
	kedudukanBadanPembentukanPerda: { value: badanItem[badanItem.length - 1] },
	kedudukanBadanAnggaran: { value: badanItem[badanItem.length - 1] },
	kedudukanBadanKehormatan: { value: badanItem[badanItem.length - 1] },
	jabatanOpd: {}
});

const viewStore = useViewStore();
const route = useRoute();
const contactId = computed(() => route.params.id);
const isContactLoaded = ref(false);
const showLoader = ref(true);

contactStore.fetchContact(false, success => {
	if(!success)
		return viewStore.showToast("Koneksi gagal", "Terjadi masalah saat menghubungi server.", false);

	const currData = contactStore.contact.find(item => item.id == contactId.value);
	if(!currData)
		return viewStore.showToast("Koneksi gagal", "Terjadi masalah saat menghubungi server.", false);

	data.nama = currData.nama;
	data.noHp = currData.no_hp;
	data.isJkelP = currData.jenis_kelamin == "Perempuan";
	data.tmpLahir = currData.tempat_lahir,
	data.alamat = currData.alamat;
	data.fraksiId = currData.fraksi ? Number(currData.fraksi.id) : null;
	data.komisiId = currData.komisi ? Number(currData.komisi.id) : null;
	data.pimpinanDewan = currData.pimpinan_dewan;
	data.kedudukanFraksi = currData.kedudukan_fraksi;
	data.kedudukanKomisi = currData.kedudukan_komisi;
	data.kedudukanBadanMusyawarah = currData.kedudukan_badan_musyawarah;
	data.kedudukanBadanPembentukanPerda = currData.kedudukan_badan_pembentukan_perda;
	data.kedudukanBadanAnggaran = currData.kedudukan_badan_anggaran;
	data.kedudukanBadanKehormatan = currData.kedudukan_badan_kehormatan;

	isContactLoaded.value = success;
	showLoader.value = false;
});

const isFraksiLoaded = ref(false);
const fraksi = computed(() => contactStore.fraksi);
contactStore.fetchFraksi(false, success => {
	if(success)
		data.fraksiId = fraksi.value[0].id;
	isFraksiLoaded.value = true;
});

const isKomisiLoaded = ref(false);
const komisi = computed(() => contactStore.komisi);
contactStore.fetchKomisi(false, success => isKomisiLoaded.value = true);

const isOpdLoaded = ref(false);
const opd = computed(() => contactStore.opd);
contactStore.fetchOpd(false, success => isOpdLoaded.value = true);

const hasSubmitted = ref(false);
const router = useRouter();

const saveContactMember = () => {
	showLoader.value = true;
	const body = {
		nama: data.nama,
		no_hp: data.noHp,
		jenis_kelamin: data.isJkelP ? "perempuan" : "laki-laki",
		alamat: data.alamat,
		tempat_lahir: data.tmpLahir,
		fraksi_id: data.fraksiId,
		komisi_id: data.komisiId,
		pimpinan_dewan: data.pimpinanDewan,
		kedudukan_fraksi: data.kedudukanFraksi,
		kedudukan_komisi: data.kedudukanKomisi,
		kedudukan_badan_musyawarah: data.kedudukanBadanMusyawarah,
		kedudukan_badan_pembentukan_perda: data.kedudukanBadanPembentukanPerda,
		kedudukan_badan_anggaran: data.kedudukanBadanAnggaran,
		kedudukan_badan_kehormatan: data.kedudukanBadanKehormatan
	};

	contactStore.updateContactMember(contactId.value, body, success => {
		showLoader.value = false;
		if(!success)
			return viewStore.showToast("Kontak tidak tersimpan", "Terjadi masalah saat menghubungi server.", false);
		
		contactStore.fetchContact(true);
		router.push("/contact");
	});
};

const onSubmit = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	console.log(isValid);
	if(!isValid)
		return;

	if(isMember.value)
		saveContactMember();
};

const confirmDialog = ref(false);
const confirmDelete = async () => {
	const isConfirm = await confirmDialog.value.confirm();
	if(!isConfirm)
		return;

	contactStore.deleteContactMember(contactId.value, success => {
		showLoader.value = false;
		if(!success)
			return viewStore.showToast("Koneksi Gagal", "Terjadi masalah saat menghubungi server.", false);
		
		contactStore.fetchContact(true);
		viewStore.showToast("Kontak", "Berhasil menghapus kontak.", true);
		router.push("/contact");
	});
};
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Kontak</h2>
		<div class="flex items-center mb-8">
			<ButtonBack />
			<button type="button" @click="confirmDelete" class="ml-auto btn btn-icon text-white transition-colors bg-red-500 hover:bg-red-400 focus:bg-red-400">
				<font-awesome-icon icon="fa-solid fa-xmark" />
				<span class="ml-2">Hapus Kontak</span>
			</button>
		</div>
		<div class="basic-card">
			<form v-if="isContactLoaded" @submit.prevent="onSubmit">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 m-8">
					<div>
						<div class="form-group mb-8">
							<label for="inputName">Nama Kontak *</label>
							<input type="text" v-model="v$.nama.$model" :class="{ 'invalid': hasSubmitted && v$.nama.$invalid }" id="inputName">
						</div>
						<div class="form-group mb-8">
							<label for="inputNoHp">No. Telepon *</label>
							<input type="tele" v-model="v$.noHp.$model" :class="{ 'invalid': hasSubmitted && v$.noHp.$invalid }" id="inputNoHp">
						</div>
						<div class="field-group form-group mb-8">
							<label class="field-group-title">Jenis Kelamin</label>
							<div class="flex items-center gap-2 ml-8">
								<label>Laki-laki</label>
								<SwitchToggle :value="data.isJkelP" @toggle="val => data.isJkelP = val" />
								<label>Perempuan</label>
							</div>
						</div>
						<div v-if="isMember" class="form-group mb-8">
							<label for="textareaAlamat">Alamat</label>
							<textarea id="textareaAlamat" v-model="v$.alamat.$model" :class="{ 'invalid': hasSubmitted && v$.alamat.$invalid }" rows="4"></textarea>
						</div>
					</div>
					<div>
						<div v-if="!isMember" class="form-group mb-8">
							<label for="textareaAlamat">Alamat</label>
							<textarea id="textareaAlamat" v-model="v$.alamat.$model" :class="{ 'invalid': hasSubmitted && v$.alamat.$invalid }" rows="4"></textarea>
						</div>
						<div class="form-group mb-4 flex items-center gap-4">
							<label>Pimpinan Dewan</label>
							<Dropdown :options="pimpinanItem" :value="data.pimpinanDewan" @change="val => data.pimpinanDewan = val" defaultTitle="Pilih Jabatan" class="dropdown-category" />
						</div>
						<div v-if="isMember" class="field-group mb-8">
							<label class="field-group-title">Badan Kelengkapan</label>
							<div class="form-group mb-4 flex items-center gap-4">
								<label>Badan Musyawarah</label>
								<Dropdown :options="badanItem" :value="data.kedudukanBadanMusyawarah" @change="val => data.kedudukanBadanMusyawarah = val" defaultTitle="Pilih Jabatan" class="dropdown-category" />
							</div>
							<div class="form-group mb-4 flex items-center gap-4">
								<label>Badan Pembentukan<br>Peraturan Daerah</label>
								<Dropdown :options="badanItem" :value="data.kedudukanBadanPembentukanPerda" @change="val => data.kedudukanBadanPembentukanPerda = val" defaultTitle="Pilih Jabatan" class="dropdown-category" />
							</div>
							<div class="form-group mb-4 flex items-center gap-4">
								<label>Badan Anggaran</label>
								<Dropdown :options="badanItem" :value="data.kedudukanBadanAnggaran" @change="val => data.kedudukanBadanAnggaran = val" defaultTitle="Pilih Jabatan" class="dropdown-category" />
							</div>
							<div class="form-group flex items-center gap-4">
								<label>Badan Kehormatan</label>
								<Dropdown :options="badanItem" :value="data.kedudukanBadanKehormatan" @change="val => data.kedudukanBadanKehormatan = val" defaultTitle="Pilih Jabatan" class="dropdown-category" />
							</div>
						</div>
						<div v-if="isMember && isFraksiLoaded" class="field-group mb-8">
							<label class="field-group-title">Fraksi</label>
							<div class="form-group mb-4 flex items-center gap-4">
								<label>Nama Fraksi</label>
								<Dropdown :options="fraksi" :value="data.fraksiId" @change="val => data.fraksiId = val" labelKey="nama_fraksi" valueKey="id" defaultTitle="Pilih Opsi" class="dropdown-category" />
							</div>
							<div class="form-group flex items-center gap-4">
								<label>Kedudukan Fraksi</label>
								<Dropdown :options="fraksiItem" :value="data.kedudukanFraksi" @change="val => data.kedudukanFraksi = val" defaultTitle="Pilih Opsi" class="dropdown-category" />
							</div>
						</div>
						<div v-if="isMember && isKomisiLoaded" class="field-group">
							<label class="field-group-title">Komisi</label>
							<div class="form-group mb-4 flex items-center gap-4">
								<label>Nama Komisi</label>
								<Dropdown :options="komisi" :value="data.komisiId" @change="val => data.komisiId = val" labelKey="nama_komisi" valueKey="id" defaultTitle="Pilih Opsi" class="dropdown-category" />
							</div>
							<div class="form-group flex items-center gap-4">
								<label>Kedudukan Komisi</label>
								<Dropdown :options="komisiItem" :value="data.kedudukanKomisi" @change="val => data.kedudukanKomisi = val" defaultTitle="Pilih Opsi" class="dropdown-category" />
							</div>
						</div>
						<div v-if="!isMember && isOpdLoaded" class="field-group">
							<label class="field-group-title">OPD</label>
							<div class="form-group mb-4 flex items-center gap-4">
								<label>Nama OPD</label>
								<Dropdown :options="opd" labelKey="name" valueKey="id" defaultTitle="Pilih Opsi" class="dropdown-category" />
							</div>
							<div class="form-group flex items-center gap-4">
								<label>Jabatan OPD</label>
								<Dropdown :options="opd" labelKey="name" valueKey="id" defaultTitle="Pilih Opsi" class="dropdown-category" />
							</div>
						</div>
					</div>
				</div>
				<div class="flex justify-end mx-8 mb-8">
					<button type="submit" class="btn btn-icon text-white bg-primary-600 hover:bg-primary-500">
						<font-awesome-icon icon="fa-solid fa-check" fixed-width />
						<span class="ml-2">Simpan Perubahan</span>
					</button>
				</div>
			</form>
			<div class="h-1 relative">
				<LoadingLine v-if="showLoader" />
			</div>
		</div>
		<ConfirmDialog ref="confirmDialog" icon="fa-solid fa-circle-exclamation">
			<template #text>
				<p class="text-sm font-medium text-gray-700">Anda akan menghapus Kontak. Lanjutkan?</p>
			</template>
			<template #btnConfirm="{ clicked }">
				<button type="button" @click="clicked" class="px-4 py-2 text-sm text-white rounded transition-colors bg-red-500 hover:bg-red-600">Hapus Kontak</button>
			</template>
		</ConfirmDialog>
	</div>
</template>
<style scoped>
	
.dropdown-category {
	@apply grow;
}

.dropdown-category :deep(.dropdown-collapse) {
	@apply z-[2];
}

.dropdown-category :deep(.dropdown-collapse) ul {
	@apply max-h-[10rem] overflow-y-auto;
}

.basic-card {
	@apply overflow-hidden shadow-lg border;
}

</style>