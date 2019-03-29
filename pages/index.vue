<template>
  <section class="users">
    <div class="users-table">
      <header class="users-table-header users-table-row">
        <div class="users-table-col id">ID</div>
        <div class="users-table-col username">Username</div>
        <div class="users-table-col email">Email address</div>
        <div class="users-table-col company">Company name</div>
      </header>
      <ul class="users-table-list">
        <nuxt-link
          v-for="user in users"
          :to="`/user/${user.id}`"
          :key="user.id"
          class="users-table-row users-table-list-user"
          @click="setCurrentUserId(user.id)"
        >
          <div class="users-table-col id">{{user.id}}</div>
          <div class="users-table-col username">{{user.name}}</div>
          <div class="users-table-col email">{{user.email}}</div>
          <div class="users-table-col company">{{user.company.name}}</div>
        </nuxt-link>
      </ul>
    </div>
  </section>
</template>

<script>

export default {
  asyncData({ store }) {
    return store.dispatch('users/getAll')
  },
  computed: {
    users() {
      return this.$store.state.users.list
    }
  },
}
</script>

<style lang="scss">
.users {
  padding: 40px;

  &-table {
    background: white;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

    &-header {
      border-top: 2px solid rgb(181, 181, 245);
      border-bottom: 1px solid #ddd;
      font-weight: bold;
      color: #444;
    }

    &-list {
      word-break: break-word;

      &-user {
        text-decoration: none;
        color: #666;
        &:hover {
          background: #f9f9f9;
          cursor: pointer;
        }

        .username {
          color: rgb(107, 107, 248);
        }
      }
    }

    &-row {
      display: flex;
      align-items: center;
      padding: 30px;
    }

    &-col {
      padding: 0 10px;

      &.id {
        width: 10%;
      }

      &.username {
        width: 30%;
      }

      &.email {
        width: 30%;
      }

      &.company {
        width: 30%;
      }
    }
  }
}
</style>

