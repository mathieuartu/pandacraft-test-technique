<template>
  <section class="user">
    <header class="user-header">
      <h1>{{user.name}}</h1>
    </header>
    <section class="user-content">
      <ul class="user-content-info">
        <li class="user-content-info-element">
          <strong>Username :</strong>
          {{user.username}}
        </li>
        <li class="user-content-info-element">
          <strong>Address :</strong>
          {{user.address && userAddress}}
        </li>
        <li class="user-content-info-element">
          <strong>Email :</strong>
          {{user.email}}
        </li>
        <li class="user-content-info-element">
          <strong>Phone number :</strong>
          {{user.phone}}
        </li>
        <li class="user-content-info-element">
          <strong>Website :</strong>
          <a
            :href="`http://${user.website}`"
            target="_blank"
            :title="`${user.name}'s website`"
          >{{user.website}}</a>
        </li>
        <li class="user-content-info-element">
          <strong>Company :</strong>
          {{user.company && user.company.name}}
        </li>
      </ul>
      <div class="user-content-section">
        <h2>{{user.name}}'s posts :</h2>
        <ul class="user-content-posts">
          <li v-for="post in userPosts" :key="post.id" class="user-content-posts-post">
            <div class="title">📋 {{post.title}}</div>
            <div class="comments" v-if="post.comments">
              <div class="comment" v-for="comment in post.comments" :key="comment.id">
                <div class="comment-email">{{comment.email}} has commented :</div>
                <div class="comment-body">{{comment.body}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="user-content-section">
        <h2>{{user.name}}'s todos :</h2>
        <ul class="user-content-todos">
          <li v-for="todo in userTodos" :key="todo.id" class="user-content-todos-todo">
            <span v-if="!todo.completed">❌</span>
            <span v-if="todo.completed">✅</span>
            <label :class="{'completed': todo.completed}">{{todo.title}}</label>
          </li>
        </ul>
      </div>

      <div class="user-content-section">
        <h2>{{user.name}}'s featured album :</h2>
        <no-ssr>
          <Flickity class="featured-album" :options="flickityOptions">
            <div class="featured-album-picture" v-for="index in 10" :key="index">
              <img :src="`https://picsum.photos/500/500/?random&${index}`">
            </div>
          </Flickity>
        </no-ssr>
      </div>

      <div class="user-content-section">
        <h2>{{user.name}}'s albums :</h2>
        <ul class="user-content-albums">
          <li
            v-for="album in userAlbums"
            :key="album.id"
            class="user-content-albums-album"
          >{{album.title}}</li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script>

export default {
  asyncData({ store, route }) {
    return Promise.all([
      store.dispatch('users/getOne', route.params.user),
      store.dispatch('users/getPostsFromUser', route.params.user),
      store.dispatch('users/getTodosFromUser', route.params.user),
      store.dispatch('users/getAlbumsFromUser', route.params.user)
    ])
  },
  data() {
    return {
      flickityOptions: {
        setGallerySize: false,
        wrapAround: false,
        cellAlign: 'right'
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.users.currentUser
    },
    userPosts() {
      return this.user.posts
    },
    userTodos() {
      return this.user.todos
    },
    userAlbums() {
      return this.user.albums
    },
    userAddress() {
      return `${this.user.address.street} (${this.user.address.suite}) - ${this.user.address.city}`
    }
  },
}
</script>

<style lang="scss">
.user {
  padding: 40px;

  &-header {
    font-size: 40px;
    color: rgb(181, 181, 245);
    margin-bottom: 40px;
  }

  &-content {
    padding: 40px;
    background: white;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

    &-info {
      margin-bottom: 80px;
      &-element {
        color: #666;
        margin-bottom: 10px;
        strong {
          color: #333;
          font-weight: bold;
        }
      }
    }

    &-section {
      margin-bottom: 80px;

      h2 {
        font-weight: bold;
        font-size: 30px;
        color: #333;
        margin-bottom: 40px;
      }

      .featured-album {
        height: 300px;

        &-picture {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        img {
          display: block;
          width: 100%;
          height: auto;
        }
      }
    }

    &-posts {
      &-post {
        margin-bottom: 80px;

        .title {
          margin-bottom: 20px;
        }
        .comments {
          padding-left: 20px;
          font-size: 14px;

          .comment {
            border: 1px solid #eee;
            padding: 20px;
            margin-bottom: 10px;
            color: #666;

            &-email {
              margin-bottom: 10px;
              font-weight: bold;
            }
          }
        }
      }
    }

    &-todos {
      &-todo {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        color: #999;

        .completed {
          color: #333;
        }

        span {
          margin-right: 20px;
        }
      }
    }

    &-albums {
      &-album {
        margin-bottom: 20px;
      }
    }
  }
}
</style>

