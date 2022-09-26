<template>
    <nav>
        <div class="flex">
            <div class="py-3 px-8 bg-black flex items-end">
                <h6 class="text-lg text-gray-100">Dewan Perwakilan Rakyat Daerah <span class="text-danger-400">Prov. Sulawesi Selatan</span></h6>
            </div>
            <div class="grow flex items-center px-16">
                <div class="relative ml-auto mr-3">
                    <div class="grid grid-cols-1 w-[20rem] lg:w-[30rem]">
                        <input ref="inputSearch" type="search" class="w-full text-base leading-none text-gray-600 bg-gray-100 rounded pl-4 pr-12 h-10" placeholder="Search...">
                    </div>
                    <button class="absolute top-0 right-0 p-3 text-lg leading-none text-gray-500 hover:text-gray-700">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    </button>
                </div>
                <button class="text-gray-600 rounded-full my-auto w-10 h-10 text-2xl mx-2">
                    <font-awesome-icon icon="fa-solid fa-circle-user" fixed-width />
                </button>
                <button class="text-gray-600 rounded-full my-auto w-10 h-10 text-xl mx-2">
                    <font-awesome-icon icon="fa-solid fa-gear" fixed-width />
                </button>
            </div>
        </div>
    </nav>
</template>