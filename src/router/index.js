import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

var routes = [{
  path: '/',
  redirect: 'login'
}, {
  path: '/login',
  name: 'login',
  component: resolve => require(['./../components/common/Login.vue'], resolve)
}, {
  path: '/index',
  name: 'index',
  redirect: {
    name: "pricing"
  },
  component: resolve => require(['@/views/index'], resolve),
  children: [{
    path: "pricing",
    name: "pricing",
    component: resolve => require(['@/views/deliveryManagement/pricing'], resolve)
  },
    {
      path: "intellDel",
      name: "intellDel",
      component: resolve => require(['@/views/deliveryManagement/intellDel'], resolve)
    },
    {
      path: "campaignLaunch",
      name: "campaignLaunch",
      component: resolve => require(['@/views/deliveryManagement/campaignLaunch'], resolve)
    }
  ]
}, {
  path: '/new',
  name: 'new',
  redirect: {
    name: "addPlan"
  },
  component: resolve => require(['@/views/index'], resolve),
  children: [{
    path: "addPlan",
    name: "addPlan",
    component: resolve => require(['@/views/newManagement/addPlan'], resolve)
  },
    {
      path: "dmpCrowd",
      name: "dmpCrowd",
      component: resolve => require(['@/views/newManagement/dmpCrowd'], resolve)
    },
    {
      path: "visitorDirection",
      name: "visitorDirection",
      component: resolve => require(['@/views/newManagement/visitorDirection'], resolve)
    }
  ]
},{
  path: '/creativity',
  name: 'creativity',
  redirect: {
    name: "creativityMan"
  },
  component: resolve => require(['@/views/index'], resolve),
  children: [{
    path: "creativityMan",
    name: "creativityMan",
    component: resolve => require(['@/views/creativityManagement/creativityMan'], resolve)
  },
    {
      path: "creativityCharts",
      name: "creativityCharts",
      component: resolve => require(['@/views/creativityManagement/creativityCharts'], resolve)
    }
  ]
},{
  path: '/report',
  name: 'report',
  redirect: {
    name: "report"
  },
  component: resolve => require(['@/views/index'], resolve),
  children: [{
    path: "reportMan",
    name: "reportMan",
    component: resolve => require(['@/views/reportManagement/reportMan'], resolve)
  }
  ]
},{
  path: '*',
  component: resolve => require(['@/components/common/404'], resolve)
}];

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  let user_approve = sessionStorage.getItem("username");
  if (user_approve) {
    to.name === "login" ? next({
      name: "index"
    }) : next();
  } else {
    to.name === "login" ? next() : next({
      name: "login"
    });
  }
});

export default router;
