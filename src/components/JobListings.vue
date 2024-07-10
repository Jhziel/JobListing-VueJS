<script setup>
import Job from "@/components/Job.vue";
import ViewAllJobButton from "@/components/ViewAllJobButton.vue";
import { onMounted, ref, defineProps } from "vue";
import axios from "axios";

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const jobs = ref({});
const loading = ref(false);
onMounted(async () => {
  try {
    let response = await axios.get("/api/jobs");
    jobs.value = response.data;
  } catch (error) {
    console.log("Error to get the data", error);
  } finally {
    loading.value = true;
  }
});
</script>

<template>
  
  <section class="bg-teal-50 px-4 py-10">
    <div v-if="loading" class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-teal-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Job
          v-for="job in jobs.slice(0, limit || jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>
    </div>

    <div v-else>
      <h1 class="text-center">Loading..</h1>
    </div>
    <ViewAllJobButton v-if="showButton" />
  </section>
</template>
