import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import JobView from "@/views/JobView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import AddJobView from "@/views/AddJobView.vue";
import JobListView from "@/views/JobListView.vue";
import EditJobView from '@/views/EditJobView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/jobs/:id",
      name: "job",
      component: JobView,
    },
    {
      path: "/jobs/add",
      name: "add-job",
      component: AddJobView,
    },
    {
      path: "/jobs",
      name: "job-list",
      component: JobListView,
    },
    {
      path: "/jobs/edit/:id",
      name: "edit-list",
      component: EditJobView,
    },
    {
      path: "/:catch(.*)",
      name: "NotFound",
      component: NotFoundView,
    },
  ],
});

export default router;
