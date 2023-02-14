<template>
  <NuxtPage />
  <Footer />
</template>

<script setup lang="ts">
  useHead({
    title: "VoidChan",
    meta: [
      {
        name: "description",
        content:
          "VoidChan is a ShareX-powered multi-format CDN. Upload your files and share them with your friends.",
      },
      {
        name: "keywords",
        content: "voidchan, voidchan cdn, voidchan sharex, voidchan sharex cd",
      },
    ],
  });
</script>
