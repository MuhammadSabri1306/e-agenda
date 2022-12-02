<script setup>
import BasicLayout from "@/components/basic-layout/Layout.vue";
import QrcodeVue from "qrcode.vue";
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="p-8">
				Attendance
				<div>
					<QrcodeVue value="https://example.com" :size="500" level="H" />
				</div>
			</div>
		</template>
	</BasicLayout>
</template>