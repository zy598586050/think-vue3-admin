const deepRoutes = (tree: any[], views: any) => {
  return tree.map((node) => {
    const tempNode = node;
    if (tempNode.component) {
      tempNode.component = views[`../views/${tempNode.component}.vue`];
    }
    if (tempNode.children && tempNode.children.length > 0) {
      deepRoutes(tempNode.children, views);
    }
    return tempNode;
  });
};

const addRoutes = (userStore: any, router: any) => {
  if (userStore.menu_tree && userStore.menu_tree.length > 0) {
    const routesData = JSON.parse(JSON.stringify(userStore.menu_tree));
    const views = import.meta.glob("../views/**/*.vue");
    deepRoutes(routesData, views);
    routesData.forEach((item: any) => {
      router.addRoute(item);
    });
  }
  router.addRoute({
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/home/404.vue"),
    meta: {
      title: "404",
      layout: true,
    },
  });
};

const clerRoutes = (userStore: any, router: any) => {
  if (userStore.menu_tree && userStore.menu_tree.length > 0) {
    userStore.menu_tree.forEach((item: any) => {
      router.removeRoute(item.name);
    });
    userStore.clearRoutes();
  }
};

export { addRoutes, clerRoutes };
