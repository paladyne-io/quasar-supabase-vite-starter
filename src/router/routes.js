const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'loginDefault',
        component: () => import('pages/LoginPage.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/RegisterPage.vue')
      },
      {
        path: 'email-confirmation',
        name: 'email-confirmation',
        component: () => import('pages/EmailConfirmationPage.vue')
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('pages/ForgotPasswordPage.vue')
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('pages/ResetPasswordPage.vue')
      }
    ],
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'me', name: 'me', component: () => import('pages/MePage.vue') },
      {
        path: 'category',
        name: 'category',
        component: () => import('src/pages/category/ListCategoryPage.vue')
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('src/pages/product/ListProductPage.vue')
      },
      {
        path: 'form-category/:id?',
        name: 'form-category',
        component: () => import('pages/category/FormCategoryPage.vue')
      },
      {
        path: 'form-product/:id?',
        name: 'form-product',
        component: () => import('src/pages/product/FormProductPage.vue')
      }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFoundPage.vue')
  }
]

export default routes
