<template lang="pug">
  .articles
    h1
      |Articles
    table.articles__table
      thead
        th
          |Article Tittle
        th
          |Content
        th
          |Comments
        th
          |Actions
      tbody
        tr(v-for="article in articlesList")
          td
            |{{article.name}}
          td
            |{{article.content}}
          td
            |{{article.comments.length}}
          td
            .articles__btn-wrap

              .articles__btn.articles__btn_comments(@click="router.push({ name: 'article', params: { articleId: article.postId }})")
                |o
              .articles__btn.articles__btn_remove
                |x
    .articles__info
      .articles__info-wrap
        |{{articlesList.length}} Articles
      .articles__info-wrap
        |{{articlesList.length}} Comments


    .modal.modal_commet
    
</template>

<script>

export default {
  name: 'articles',
  data() {
    return {
    }
  },
  computed: {
    articlesList() {
      console.log(this.$store.state.articles);
      
      return this.$store.state.articles 
    }
  },
  created() {
    this.$store.commit('getArticles');
  }
};
</script>
<style lang="scss">
.articles{
  .articles__btn-wrap{
    display: flex;
    justify-content: space-around;
  }
  .articles__btn{
    cursor: pointer;
  }
  &__table{
    width: 100%;
    td{
      text-align: left;
      &:last-child{
      }
    }
  }
}
</style>