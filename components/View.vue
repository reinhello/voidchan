<template>
  <div v-if="file?.code === 404">
    <NotFound />
  </div>
  <div v-else>
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-3xl p-5 font-extrabold">{{ fileParam }}</h1>
      <br>
      <img class="noselect p-5" ondragstart="return false" draggable="false" :src="'http://localhost:3000/raw/' + fileParam" />
      <p>Uploaded by <b>{{ files?.uploader }}</b> at <b>{{ moment(files?.date).format("D/MM/YY, h:mm:ss A") }}</b></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";

const fileParam = useRoute().params.file as string;
const { data: file } = useFetch(`/raw/${fileParam}`);
const { data: files } = useFetch(`/api/file/${fileParam.split(".")[0]}`)
</script>
