<template lang="pug">
v-app(dark)
  #main(:class="{'unscroll': this.$route.params.id}")
      |{{getArticlesList}}
      .articles
        h1
          |Articles
        .table-sroll-wrap
          transition(name="slide-up")
            table.table.articles__table(key="table" v-if="articlesList.length")
              thead.thead
                th.th.clicable(@click="sortTitle")
                  |Article Title
                  i.material-icons(:class="{'rotate':!this.sortByTitle}")
                    |keyboard_arrow_up
                th.th
                  |Content
                th.th.clicable(@click="sortComment")
                  |Comments
                  i.material-icons(:class="{'rotate':!this.sortByComment}")
                    |keyboard_arrow_up
                th.th
                  |Actions
              tbody.tbody(name="slide-left" is="transition-group")
                  tr.tr(v-for="article in articlesList" :key="article.postId")
                    td.td
                      |{{article.name}}
                    td.td
                      |{{article.content}}
                    td.td
                      |{{article.comments.length}}
                    td.td
                      .articles__btn-wrap

                        //- .articles__btn.articles__btn_comments(@click="router.push({ name: 'article', params: { articleId: article.postId }})")
                        router-link(:to="'/comments/'+article.postId")  
                          i.material-icons
                            |comment
                        i.material-icons.articles__btn.articles__btn_remove(@click="removeArticle(article.name, article.postId)") 
                          |delete_sweep
        .articles__info(key="info" v-if="articlesList.length")
          .articles__info-wrap
            |{{articlesList.length}} Articles
            i.material-icons
              |web
          .articles__info-wrap
            |{{allCommetsLength(articlesList)}} Comments
            i.material-icons
              |comment

      transition(name="slide-up")
        Modal(v-if="this.$route.params.id")
          router-view

  
</template>

<script>
// @ is an alias to /src
import Modal from '@/components/Modal.vue'
export default {
  name: 'app',
  components: {
    Modal
  },
  data() {
    return {
      sortByComment: true,
      sortByTitle: true,
      articlesList: []
    }
  },
  methods:{
    sortComment(){
      if(this.sortByComment = !this.sortByComment)
        this.articlesList.sort((a, b) => b.comments.length - a.comments.length);
      else
        this.articlesList.sort((a, b) => a.comments.length - b.comments.length);
    },
    sortTitle(){
      if(this.sortByTitle = !this.sortByTitle)
        this.articlesList.sort((a, b) => !(a.name > b.name) && 1 || -1);
      else
        this.articlesList.sort((a, b) => !(a.name < b.name) && 1 || -1);
      
    },
    allCommetsLength(list){
      let col = 0;
      list.forEach(element => element.comments.forEach(element => col++));
      return col
    },
    removeArticle(name, id) {
      if (confirm('Are you sure you want to remove article "'+name+'"?')) {
        this.$store.commit('removeArticle', id);
      }
    }
  },
  computed: {
    getArticlesList() {
      this.articlesList = this.$store.state.articles
    }
  },
  
  mounted() {
    this.$store.commit('getArticles');
  }
};
</script>
<style lang="scss" scope>
.table-sroll-wrap{
  overflow: auto;
  @media(max-width: 480px) {
    max-height: 80vh;
  }
}
.articles{
  .articles{
    &__info{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      color: #fff;
      &-wrap{
        padding: 20px;
        display: flex;
        flex: 1 0 100px;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        i{
          margin-left: 10px;
        }
      }
    }
  }
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
<style lang="scss">
.clicable{
  cursor: pointer;
}
html{
  overflow-y: hidden;
}
body {
  overflow: hidden;
  padding: 0;
  margin: 0;
}
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  &.unscroll{
    overflow: hidden;
  }
}
.phantom-scroll{
  height: 100vh;
  overflow: hidden;
  overflow-y: hidden;
  &.phantom-scroll_active{
    overflow-y: scroll;
  }
}
.table{
  border: 2px solid #333;
  border-collapse: collapse;
}
.th{
  background-color: #999;
}
.th,.td{
  border: 2px solid #333;
  border-top: 0;
  border-bottom: 0;
  text-align: left;
  padding: 5px 10px;
  vertical-align: top;
  min-width: 120px;
  i{
    vertical-align: middle;
    transition: 0.3s;
    &.rotate{
      transform: scaleY(-1);
    }
  }
}
.td{
  &:last-child{
    text-align: center;
  }
}
.tr{
  &:nth-child(odd){
    background-color: #d3d3d3;
  }
  &:nth-child(even){
    background-color: #f3f3f3;
  }
}
.slide-up-enter-active, .slide-up-leave-active {
  transition: 0.3s;
  opacity: 1;
  transform: translateY(0);
}
.slide-up-enter, .slide-up-leave-to {
  transform: translateY(-40px);
  opacity: 0;
}
.slide-left-enter-active, .slide-left-leave-active {
  transition: 0.3s;
  opacity: 1;
  transform: translateX(0);
}
.slide-left-enter, .slide-left-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}
</style>
