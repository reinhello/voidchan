<template>
  <div class="centered">
    <h1 class="text-2xl p-5">
      <span class="font-extrabold">VoidChan</span> - A ShareX-Powered
      Multi-Format CDN
    </h1>
    <div>
      <div v-if="status === 'unauthenticated'">
        <button class="btn" @click="signIn()">Login</button>
      </div>
      <div v-else-if="status === 'authenticated'">
        <p>
          Hello, <b>{{ data?.user?.name }}</b>
        </p>
        <br /><br />
        <nuxt-link to="/dashboard"
          ><button
            class="btn mx-2"
            style="color: #42b893; border-color: #42b893"
          >
            Dashboard
          </button></nuxt-link
        >
        <button class="btn" @click="signOut({ callbackUrl: '/' })">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* @ts-ignore */
const { data, status, signIn, signOut } = useSession();

useFetch("/api/account");
</script>
