<script setup>
import { ref } from "vue";
import ShortToggle from "@/components/shared/forms/ShortToggle.vue";
import FormItem from "@/components/shared/forms/FormItem.vue";
import FormLabel from "@/components/shared/forms/FormLabel.vue";
import FormInput from "@/components/shared/forms/FormInput.vue";
import FormSelect from "@/components/shared/forms/FormSelect.vue";
import FormNumbers from "@/components/shared/forms/FormNumbers.vue";
import FormText from "@/components/shared/forms/FormText.vue";
import FormTextArea from "@/components/shared/forms/FormTextArea.vue"
import InformationAlert from '@/components/shared/InformationAlert.vue';


const host = ref('');
const port = ref('465')
const ssl = ref(true)
const displayName = ref('')
const email = ref('')
const username = ref('')
const password = ref('')

const subject = ref('')
const message = ref('')
const bcc = ref('')


</script>
<template>
    <form class="space-y-2 divide-y divide-gray-500 overflow-auto">
        <div class="space-y-2 sm:space-y-2">
            <div class="space-y-2">
                <div>
                    <h1 class="text-2xl font-light drop-shadow-sm text-zinc-300">
                        General
                    </h1>
                </div>
                <div class="space-y-2">
                    <FormItem>
                        <FormLabel class="col-span-1">Host</FormLabel>
                        <FormInput class="flex items-center space-x-2">
                            <FormText :text="host" class=" w-64" />
                            <p class="text-sm text-sky-400 cursor-pointer">Learn more</p>
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel class="col-span-1">Port</FormLabel>
                        <FormInput>
                            <FormText :text="port" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel class="col-span-1">SSL enabled</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="ssl" @click="ssl = !ssl" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel class="col-span-1">Display name</FormLabel>
                        <FormInput>
                            <FormText :text="displayName" class=" w-64" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel class="col-span-1">Email address</FormLabel>
                        <FormInput>
                            <FormText :text="email" class=" w-64" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel class="col-span-1">Username</FormLabel>
                        <FormInput>
                            <FormText :text="username" class=" w-64" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel class="col-span-1">Password</FormLabel>
                        <FormInput>
                            <FormText :text="password" class=" w-64" />
                        </FormInput>
                    </FormItem>
                </div>
            </div>
            <div class="space-y-2">
                <div>
                    <h1 class="text-2xl font-light drop-shadow-sm text-zinc-300">
                        General
                    </h1>
                    <InformationAlert color="sky" tip="If you deside to leave these fields blank, automatically  
                            generated subject and message for the customer will be used. 
                            You can change them before message is sent." />
                </div>
                <div class="space-y-2">
                    <FormItem>
                        <FormLabel class="col-span-1">Subject</FormLabel>
                        <FormInput class="flex items-center space-x-2">
                            <FormText :text="subject" class=" w-64" />
                            <p class="text-sm text-sky-400 cursor-pointer">Learn more</p>
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel class="col-span-1">Message</FormLabel>
                        <FormInput>
                            <FormTextArea :text="message" class=" w-96" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel class="col-span-1">Bcc</FormLabel>
                        <FormInput>
                            <FormText :text="bcc" class=" w-64" />
                        </FormInput>
                    </FormItem>
                </div>
            </div>
        </div>
    </form>
</template>