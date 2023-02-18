<template>
  <div v-if="file?.code === 404">
    <NotFound />
  </div>
  <div v-else class="centered" style="padding: 0 0.5rem">
    <div class="flex flex-col items-center justify-center">
      <br class="noselect" ondragstart="return false" draggable="false">
      <h1 style="margin-top: 15%;" class="text-3xl font-extrabold">{{ fileParam }}</h1>
      <br class="noselect" ondragstart="return false" draggable="false">
      <img v-if="files?.nsfw" class="nsfw noselect p-5" ondragstart="return false" draggable="false" :src="'http://localhost:3000/raw/' + fileParam" />
      <img v-else class="noselect p-5" ondragstart="return false" draggable="false" :src="'http://localhost:3000/raw/' + fileParam" />
      <p>Uploaded by <b>{{ files?.uploader?.name }}</b> at <b>{{ moment(files?.date).format("D/MM/YY, h:mm:ss A") }}</b></p>
      <br class="noselect" ondragstart="return false" draggable="false">
      <div>
        <nuxt-link to="/"><button class="btn mx-2"><i class="fas fa-home"></i> Home</button></nuxt-link>
        <button class="btn" @click="downloadImage()"><i class="fas fa-cloud-download-alt"></i> Download</button>
      </div>
      <br class="noselect" ondragstart="return false" draggable="false">
      <div v-if="status === 'authenticated'">
        <div v-if="files?.uploader?.admin">
          <h2 class="text-2xl p-5 font-bold">Admin Area</h2>
          <button class="btn" style="border-color: #ad0c00;" @click="deleteImage()"><i class="fas fa-trash-alt"></i> Delete Image</button>
          <button v-if="files?.nsfw" class="btn mx-2" style="border-color: #d8e43a;" @click="markNSFW(false)"><i class="fas fa-ban"></i> Mark as non-NSFW</button>
          <button v-else class="btn mx-2" style="border-color: #d8e43a;" @click="markNSFW(true)"><i class="fas fa-ban"></i> Mark as NSFW</button>
          <br class="noselect" ondragstart="return false" draggable="false">
          <br class="noselect" ondragstart="return false" draggable="false">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";

const fileParam = useRoute().params.file as string;
const { status } = useSession();
const { data: file } = useFetch(`/raw/${fileParam}`);
const { data: files } = useFetch(`/api/file/${fileParam.split(".")[0]}`)
const refreshing = ref(false);

async function refreshPage() {
  refreshing.value = true;

  try {
    await refreshNuxtData();
  } finally {
    refreshing.value = false;
  }
}

function deleteImage() {
  $fetch(`/api/file/${fileParam.split(".")[0]}`, {
    method: "DELETE",
  });

  window.location.href = "/";
}

function downloadImage() {
  window.location.href = `/api/download/${fileParam}`;
}

function markNSFW(val: boolean) {
  $fetch(`/api/file/${fileParam.split(".")[0]}`, {
    method: "PATCH",
    body: JSON.stringify({
      nsfw: val,
    }),
  });

  refreshPage();
}

useHead({
  title: `VoidChan - ${fileParam}`,
  meta: [
    {
      property: "og:title",
      content: `VoidChan`,
    },
    {
      property: "og:site_name",
      content: `${fileParam} • Uploaded by ${files.value?.uploader?.name}`,
    },
    {
      property: "og:url",
      content: `http://localhost:3000/v/${fileParam}`,
    },
    {
      property: "og:image",
      content: `http://localhost:3000/raw/${fileParam}`,
    },
    {
      property: "theme-color",
      content: "#42B893",
    },
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
  ],
});
</script>
