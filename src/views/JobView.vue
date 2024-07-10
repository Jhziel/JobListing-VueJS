<script setup>
import BackButton from "@/components/BackButton.vue";
import { useToast } from "vue-toastification";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const jobId = route.params.id;

const loading = ref(false);
const job = ref({});

const deleteJob = async () => {
  try {
    await axios.delete(`/api/jobs/${jobId}`);
    toast.success("Successfully delete Job");
    router.push("/jobs");
  } catch (error) {
    console.log("Unsuccessfully delete Job", error);
    toast.error("Unsuccessfully delete Job");
  }
};

onMounted(async () => {
  try {
    let response = await axios.get(`/api/jobs/${jobId}`);
    job.value = response.data;
  } catch (error) {
    console.log("Unable to fetch data", error);
  } finally {
    loading.value = true;
  }
});
</script>

<template>
  <BackButton />
  <section class="bg-green-50" v-if="loading">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-10 w-full gap-6">
        <main class="col-span-10 md:col-span-7">
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <div class="text-gray-500 mb-4">{{ job.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ job.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
            >
              <i
                class="fa-solid fa-location-dot text-lg text-orange-700 mr-2"
              ></i>
              <p class="text-orange-700">{{ job.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Job Description
            </h3>

            <p class="mb-4">
              {{ job.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ job.salary }} / Year</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside class="col-span-10 md:col-span-3">
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <h2 class="text-2xl">{{ job.company.name }}</h2>

            <p class="my-2">
              {{ job.company.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold break-words">
              {{ job.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ job.company.contactPhone }}
            </p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink
              :to="`/jobs/edit/${jobId}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit Job</RouterLink
            >
            <button
              @click="deleteJob"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
  <div v-else>
    <h1>Loading...</h1>
  </div>
</template>
