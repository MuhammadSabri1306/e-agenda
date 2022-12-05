<template>
	<footer class="bg-gray-900">
		<div class="container p-16">
			<div class="grid grid-cols-2 gap-16">
				<div>
					<router-link to="/" class="flex items-center mb-4 transition-opacity opacity-100 hover:opacity-80">
						<img src="/assets/img/logo-pemprov-sulsel.webp" class="h-24 w-auto">
						<div class="ml-2">
							<h5 class="text-4xl leading-none font-bold tracking-widest text-warning-400 text-shadow-black">DPRD</h5>
							<h6 class="text-base leading-none font-semibold text-warning-400 text-shadow-black">SULAWESI SELATAN</h6>
						</div>
					</router-link>
					<ul class="flex flex-col items-start mb-8">
						<li><a target="_blank" href="https://goo.gl/maps/GFoGKvtT3fKYAoqo8" class="footer-link"><span><b>Alamat : </b>Jl. Urip Sumoharjo No.59 Kota Makassar, Sulawesi Selatan 90232</span></a></li>
						<li><a target="" href="mailto:dprd@sulselprov.go.id" class="footer-link"><span><b>Email : </b>dprd@sulselprov.go.id</span></a></li>
						<li><a target="_blank" href="tel:0411453344" class="footer-link"><span><b>Telp : </b>(0411) 453344</span></a></li>
					</ul>
					<div class="ml-8 flex flex-wrap gap-4">
						<a target="_blank" href="https://www.facebook.com/dprd.sulsel.59" class="social-link hover-margin hover:bg-blue-800">
							<font-awesome-icon icon="fa-brands fa-facebook-f" />
						</a>
						<a href="#" class="social-link hover-margin hover:bg-blue-600">
							<font-awesome-icon icon="fa-brands fa-twitter" />
						</a>
						<a href="#" class="social-link hover-margin hover:bg-pink-600">
							<font-awesome-icon icon="fa-brands fa-instagram" />
						</a>
						<a href="#" class="social-link hover-margin hover:bg-red-600">
							<font-awesome-icon icon="fa-brands fa-youtube" />
						</a>
					</div>
				</div>
				<div>
					<h6 class="mt-16 font-bold text-gray-100 text-2xl mb-4">Link Terkait</h6>
					<ul class="flex flex-col items-start">
						<li><a target="_blank" href="https://dprd.sulselprov.go.id/" class="footer-link"><span>DPRD Prov. Sulawesi Selatan</span></a></li>
						<li><a target="_blank" href="https://sulselprov.go.id/" class="footer-link"><span>Pemerintah Prov. Sulawesi Selatan</span></a></li>
						<li><a target="_blank" href="https://jdih.dprd.sulselprov.go.id/" class="footer-link"><span>JDIH Prov. Sulsel</span></a></li>
						<li><a target="_blank" href="https://dpr.go.id/" class="footer-link"><span>DPR RI</span></a></li>
						<li><a target="_blank" href="https://mpr.go.id/" class="footer-link"><span>MPR RI</span></a></li>
						<li><a target="_blank" href="https://mkri.id/" class="footer-link"><span>Mahkamah Konstitusi</span></a></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="container px-16 pb-8">
			<p class="text-sm font-semibold text-gray-500 text-center">&copy; Copyright 2022 DPRD Provinsi Sulawesi Selatan. All rights reserved.</p>
		</div>
	</footer>
</template>
<style scoped>
	
.footer-link {
	@apply relative block mx-4 px-4 py-2 transition-colors text-gray-300 hover:text-white before:absolute before:top-0 before:left-0 before:h-full before:bg-blue-800 before:rounded-sm before:transition-all before:duration-300 before:w-0 hover:before:w-full;
}

.footer-link span {
	@apply relative text-sm font-medium;
}

.social-link {
	@apply w-10 h-10 text-lg text-white flex justify-center items-center rounded-full bg-gray-800;
}

</style>