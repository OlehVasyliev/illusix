<template lang="pug">
  .article(v-if="this.$store.state.articles.some(article => article.postId == this.$route.params.id)")
    |{{articleData}}
    .modal__header
      .article-info
        |Comments for article "{{this.$store.state.articles.filter(article => article.postId == this.$route.params.id)[0].name}}"
      i.material-icons.modal__close(@click="closeModeal")
        |close

    .comments(v-if="comments.length")
      table.table.comments__table
        thead.thead
          th.th
            |Comment
          th.th
            |Remove
        tbody.tbody
          tr.tr(v-for="comment in comments")
            td.td
              |{{comment.text}}
            td.td
              .comments__btn-wrap
                i.material-icons.comments__btn.comments__btn_remove(@click="removeComment(comment.id)")
                  |delete_sweep
    .comments.comments_not-found(v-else)
      |Comments Not Found
  
    .modal__footer
      v-btn.savestate(color="success" @click="saveState")
        |ok
  .article.article_not-found(v-else)
    .modal__header
      .article-info
      .modal__close(@click="closeModeal")
        |x
    |Article Not Found

</template>
<script>
export default {
  name: 'comments',
  data() {
    return {
      comments: []
    }
  },
  methods:{
    closeModeal(){
      this.$router.push({ path: '/' })
    },
    removeComment(commentId) {
      if (confirm('Are you sure to remove this comment?')) {
        this.comments = this.comments.filter(comment => comment.id != commentId);
      }
    },
    saveState(){
      let newState = this.$store.state.articles;
      if(this.comments.length == this.$store.state.articles.filter(article => article.postId == this.$route.params.id)[0].comments.length)
        this.$router.push({ path: '/' })
      else
        if(confirm('Data has been changed to save')) {
          newState[this.$route.params.id].comments = this.comments;
          this.$store.commit('updateState', newState);
          this.$router.push({ path: '/' })
        }else{
          this.$router.push({ path: '/' })
        }
    }
  },
  computed: {
    articleData() {
      this.comments = this.$store.state.articles.filter(article => article.postId == this.$route.params.id)[0].comments
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.savestate{
  margin-left: auto;
  margin-right: auto;
  display: table;
}
.modal{
  &__header{
    display: flex;
    justify-content: space-between;
  }
  &__close{
    margin-left: auto;
    cursor: pointer;
    margin-bottom: 7px;
    transition: 0.3s;
    right: 0;
    top: 2px;
  }

}
.comments__btn{
  cursor: pointer;
}
</style>
