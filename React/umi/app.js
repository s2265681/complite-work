export function patchRoutes({ routes }) {
    console.log(routes,'ssss');
    routes[0].routes.unshift({
      path: '/foo',
      exact: true,
      component: ()=> <div>foo</div>
    });
  }