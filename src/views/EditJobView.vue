<script setup>
import BackButton from "@/components/BackButton.vue";
import JobForm from "@/components/JobForm.vue";
import { useRoute, useRouter } from "vue-router";
import { reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const jobId = route.params.id;
const form = reactive({
  type: "",
  title: "",
  description: "",
  salary: "",
  location: "",
  company: {
    name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  },
});

const handleEditSubmit = async (jobData) => {
  let response = await axios.put(`/api/jobs/${jobId}`, jobData);
  toast.success("Successfully Update the Job");
  router.push(`/jobs/${response.data.id}`);
};
const fetchData = async () => {
  try {
    let response = await axios.get(`/api/jobs/${jobId}`);
    Object.assign(form, response.data);
  } catch (error) {
    console.log("Error", error);
    toast.error("Unable to fecth data");
  }
};
onMounted(fetchData);
</script>

<template>
  <BackButton />
  <JobForm
    :form="form"
    :onSubmit="handleEditSubmit"
    formTitle="Edit Job"
    formButton="Update Job"
  />
</template>
