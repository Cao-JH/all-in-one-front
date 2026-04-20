import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home/index.vue'),
    },
    {
      path: '/books/reader/:bookId',
      name: 'BooksReader',
      component: () => import('@/views/Books/reader.vue'),
      props: true,
    },
  ],
})

export default router
