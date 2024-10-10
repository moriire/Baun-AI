import { createRouter, createWebHistory } from "vue-router";
//import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      component: () => import("@/views/auth/AuthBase.vue"),
      children: [
        { path: "auth", component: () => import("@/views/auth/LoginView.vue") },
        {
          path: "",
          name: "index",
          component: () => import("@/views/HomeView.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/ai",
      name: "home",
      component: () => import("@/views/PagesBase.vue"),
      children: [
        {
          path: "tutor",
          name: "tutor",
          component: () => import("@/views/TutorView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "teachers-assistant",
          name: "lp",
          component: () => import("@/views/LPView.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/quiz",
      children:[
        {
          path: "",
          name: "quiz",
          component: () => import("@/views/QuizHomeView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/views/DashboardView.vue"),
          meta: { requiresAuth: true },
        },
      ],
      component: () => import("@/views/QuizBase.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token");
  if (to.meta.requiresAuth && !token) {
    next("/auth");
  } else {
    next();
  }
});
export default router;
