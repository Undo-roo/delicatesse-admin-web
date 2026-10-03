<template>
    <div class="relative flex min-h-screen overflow-hidden bg-primary">
        <!-- Decorative vertical WELCOME (desktop only) -->
        <div class="pointer-events-none absolute inset-y-0 right-0 z-0 hidden items-center justify-end lg:flex">
            <span class="welcome-vertical select-none pr-3 text-[140px] font-bold leading-none text-[#651D6E] xl:text-[180px] 2xl:text-[196px]">
                WELCOME
            </span>
        </div>

        <!-- Brand + form -->
        <div class="relative z-10 flex w-full flex-col gap-12 px-6 py-16 sm:px-12 lg:w-[720px] lg:px-16">
            <!-- Brand -->
            <div class="flex gap-x-6 items-center">
              <presets-logo />
              
              <div class="flex flex-col gap-1">
                  <span class="text-xl font-semibold uppercase leading-tight text-white">DELICATESSE</span>
                  <span class="text-xl font-semibold uppercase leading-tight text-white">FOOD CORPORATION</span>
              </div>
            </div>

            <!-- Form -->
            <form class="flex w-full max-w-[646px] flex-col my-auto gap-4" @submit.prevent="onSignIn">
                <label for="login-email" class="text-lg text-white">
                    Email address ( EmployeeName + ID# )*
                </label>

                <div class="flex h-16 items-center gap-3 rounded-md bg-[#F9F9F9] px-4">
                    <Icon name="boxicons:envelope" class="size-7 shrink-0 text-primary" />
                    <input
                        id="login-email"
                        v-model="email"
                        type="email"
                        placeholder="juan.delacruz@delicatesse.com"
                        class="min-w-0 flex-1 bg-transparent text-lg font-bold text-black outline-none placeholder:font-medium placeholder:text-[#737373]"
                    />
                </div>

                <div class="mt-2 flex h-16 items-center gap-3 rounded-md bg-[#F9F9F9] px-4">
                    <Icon name="boxicons:lock" class="size-7 shrink-0 text-primary" />
                    <input
                        id="login-password"
                        v-model="password"
                        type="password"
                        placeholder="Enter Password"
                        class="min-w-0 flex-1 bg-transparent text-lg font-bold text-black outline-none placeholder:font-medium placeholder:text-[#737373]"
                    />
                </div>

                <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-6">
                    <button
                        type="submit"
                        class="h-14 flex-1 cursor-pointer rounded-md bg-[#F4F4F4] text-xl font-bold uppercase text-primary transition-colors hover:bg-white"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
const email = ref('');
const password = ref('');

function onSignIn() {
    // TODO: wire to auth — const { auth } = useApi(); await auth.login({ email, password })
    console.log('sign in', { email: email.value, password: password.value });
    navigateTo('admin')
}
</script>

<style scoped>
/* Vertical text reading bottom→top, matching the Figma -90° rotation */
.welcome-vertical {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
}
</style>
