<template>
    <nav>
        <div class="flex">
            <div class="py-3 px-16 bg-black">
                <a href="#" class="flex items-center text-warning-400 text-shadow-black transition-transform scale-100 hover:scale-95">
                    <img src="/assets/img/logo-pemprov-sulsel.webp" class="h-12 w-auto">
                    <div class="ml-2">
                        <p class="text-2xl leading-none font-bold tracking-widest">DPRD</p>
                        <p class="text-xs leading-none font-semibold">SULAWESI SELATAN</p>
                    </div>
                </a>
            </div>
            <div class="grow flex items-center px-16">
                <div class="relative ml-auto mr-3">
                    <div class="grid grid-cols-1 w-[20rem] lg:w-[30rem]">
                        <input ref="inputSearch" type="search" class="w-full text-sm leading-none text-gray-600 bg-gray-100 rounded pl-4 pr-12 h-10 border border-transparent hover:border-gray-200 focus:border-gray-200" placeholder="Search...">
                    </div>
                    <button class="absolute top-0 right-0 p-3 text-lg leading-none text-gray-500 hover:text-gray-700">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    </button>
                </div>
                <button class="text-gray-500 hover:text-gray-700 rounded-full my-auto w-10 h-10 text-2xl mx-2">
                    <font-awesome-icon icon="fa-solid fa-circle-user" fixed-width />
                </button>
                <button class="text-gray-500 hover:text-gray-700 rounded-full my-auto w-10 h-10 text-xl mx-2">
                    <font-awesome-icon icon="fa-solid fa-gear" fixed-width />
                </button>
            </div>
        </div>
    </nav>
</template>