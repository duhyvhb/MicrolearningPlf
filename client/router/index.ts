import { setupBread } from "@/store";
import localCache from "@/utils/cache";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/LoginView.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/HomeView.vue"),
    children: [
      {
        path: "",
        redirect: "/home/course/explore"
      },
      {
        path: "course/explore",
        name: "courseExplore",
        component: () => import("@/views/course/courseExplore.vue")
      },
      {
        path: "course/user",
        name: "courseUser",
        component: () => import("@/views/course/courseUser.vue")
      },
      {
        path: "course/manage",
        name: "courseManage",
        component: () => import("@/views/course/courseManage.vue")
      },
      {
        path: "course/user/learn",
        name: "courseLearn",
        component: () => import("@/views/course/courseLearn.vue")
      },
      {
        path: "post",
        name: "post",
        component: () => import("@/views/post/postSelect.vue")
      },
      {
        path: "post/view",
        name: "postView",
        component: () => import("@/views/post/postView.vue")
      },
      {
        path: "post/add",
        name: "postAdd",
        component: () => import("@/views/post/postAddView.vue")
      },
      {
        path: "post/detail",
        name: "postDetail",
        component: () => import("@/views/post/postDetail.vue")
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("@/views/profile/profileView.vue")
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/notFound/notFound.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (localCache.getCache("token")) {
    //toekn存在
    if (to.path == "/login") {
      //token存在，并且是login页面
      const bread = [];
      bread.push({ name: "Course" });
      bread.push({ name: "Explore" });
      localCache.setCache("currentBread", bread);
      setupBread();
      next("/home");
    } else {
      //token存在，不是login页面
      next();
    }
  } else {
    if (to.path == "/login") {
      //token不存在，并且是login页面
      next();
    } else {
      //token不存在，不是login页面
      next("/login");
    }
  }
});

export default router;
