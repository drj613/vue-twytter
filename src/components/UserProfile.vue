<template>
  <div class="user-profile">
    <div class="user-profile__sidebar">
      <div class="user-profile__user-panel">
        <h1 class="user-profile__username">@{{ user.username }}</h1>
        <div class="user-profile__admin-badge" v-if="user.isAdmin">Admin</div>
        <div class="user-profile__follower-count">
          <strong>Followers: </strong> {{ followers }}
        </div>
        <CreateTwootPanel @add-twoot="addTwoot"/>
      </div>
    </div>
    <div class="user-profile__twoots-wrapper">
      <!-- v-for requires a :key; can also be done like `v-for="(twoot, index)..."` -->
      <Twoot v-for="twoot in user.twoots" 
             :key="twoot.id"
             :username="user.username" 
             :twoot="twoot"
             :id="`twoot-${twoot.id}`"
        />
    </div>
  </div>
</template>

<script>
import Twoot from './Twoot';
import CreateTwootPanel from './CreateTwootPanel'

export default {
  name: "UserProfile",
  components: { Twoot, CreateTwootPanel },
  data() {
    return {
      followers: 0,
      user: {
        id: 1,
        username: 'dj',
        firstName: 'DJ',
        lastName: 'Atwell',
        email: 'email@example.com',
        isAdmin: true,
        twoots: [
          { id: 1, content: 'Welcome to Twytter' },
          { id: 2, content: 'I like turtles' }
        ]
      }
    }
  },
  watch: {
    // Generally want to compare old to new when adding a watcher
    followers(newFollowerCount, oldFollowerCount) {
      if (oldFollowerCount < newFollowerCount) {
        console.log(`@${this.user.username} has gained a follower!`)
      }
    }
  },
  computed: {
    newTwootCharacterCount() {
      return this.newTwootContent.length;
    }
  },
  methods: {
    followUser() {
      this.followers++;
    },
    addTwoot(twoot) {
      this.user.twoots.unshift({ id: this.user.twoots.length + 1, content: twoot });
    }
  },
  mounted() {
    this.followUser();
  }
}
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 2fr 3fr;
  width: 90%;
  padding: 50px 5%;

  .user-profile__user-panel {
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #DFE3E8;
    h1 { margin: 0; }
    .user-profile__admin-badge {
      padding: 2px 8px;
      margin-right: auto;
      background-color: red;
      color: white;
      border-radius: 5px;
      font-weight: bold;
    }
    .user-profile__follower-count {
      padding-bottom: 1rem;
    }
  }
}
</style>