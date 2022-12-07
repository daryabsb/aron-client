<script setup>
import { useUserStore } from '@/stores/user';

const store = useUserStore()

</script>
<template>
    <Popper hover>

        <a href="#" class="relative block">
            <img alt="Maurice Lokumba" :src="store.user.image" class="mx-auto h-10 w-10 rounded-full object-cover" />
        </a>
        <template #content="{ close }">
            <div
                class="bg-white text-base z-50 float-left py-2 list-none text-left shadow-lg min-w-64 pr-16 mx-4 cursor-pointer">
                <a href="javascript:void(0);"
                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
                    Profile
                </a>
                <a href="javascript:void(0);"
                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
                    My Orders
                </a>

                <div class="h-0 my-2 border border-solid border-slate-100" />
                <a href="#"
                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
                    @click="store.signOut">
                    Logout
                </a>
                <a class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
                    @click="close">Close</a>
            </div>
        </template>
    </Popper>
</template>