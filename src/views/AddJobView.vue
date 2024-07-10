<script setup>
import BackButton from "@/components/BackButton.vue";
import JobForm from "@/components/JobForm.vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { reactive } from "vue";
import axios from "axios";

const router = useRouter();
const toast = useToast();

const form = reactive({
  type: "Full-Time",
  title: "",
  description: "",
  salary: "Under $50K",
  location: "",
  company: {
    name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  },
});

const handleAddJob = async (jobData) => {
  const response = await axios.post("/api/jobs/", jobData);
  toast.success("Successfully Added Job");
  router.push(`/jobs/${response.data.id}`);
};
</script>

<template>
  <BackButton />
  <JobForm :form="form" :onSubmit="handleAddJob" />
</template>
