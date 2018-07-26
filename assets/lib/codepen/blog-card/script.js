Vue.component('blog-card', {
  template: '#blog-card',
  data: () => ({
    name: '10 Best Things to Do in Seattle',
    category: 'Travel',
    image: 'https://source.unsplash.com/DnWYw0zLJBg',
    author: 'Katherine Kato',
    desc: `Seattle is a seaport city on the west coast of the United States...`
  })
});

new Vue({
  el: '#container'
});
