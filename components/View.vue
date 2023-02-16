<template>
  <div v-if="file?.code === 404">
    <NotFound />
  </div>
  <div v-else class="centered" style="padding: 0 0.5rem">
    <div class="flex flex-col items-center justify-center">
      <br class="noselect" ondragstart="return false" draggable="false">
      <br class="noselect" ondragstart="return false" draggable="false">
      <h1 class="text-3xl font-extrabold">{{ fileParam }}</h1>
      <br class="noselect" ondragstart="return false" draggable="false">
      <img class="noselect p-5" ondragstart="return false" draggable="false" :src="'http://localhost:3000/raw/' + fileParam" />
      <p>Uploaded by <b>{{ files?.uploader?.name }}</b> at <b>{{ moment(files?.date).format("D/MM/YY, h:mm:ss A") }}</b></p>
      <br class="noselect" ondragstart="return false" draggable="false">
      <nuxt-link to="/"><button class="btn">Home</button></nuxt-link>
      <br class="noselect" ondragstart="return false" draggable="false">
      <div v-if="status === 'authenticated'">
        <div v-if="files?.uploader?.admin">
          <h2 class="text-2xl p-5 font-bold">Admin Area</h2>
          <button class="btn" style="border-color: #ad0c00;" @click="deleteImage()">Delete Image</button>
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

function deleteImage() {
  $fetch(`/api/file/${fileParam.split(".")[0]}`, {
    method: "DELETE",
  });

  window.location.href = "/";
}
</script>
