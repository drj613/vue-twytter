<template>
  <form class="create-twoot-panel" @submit.prevent="createNewTwoot" :class="{ '--exceeded': newTwootCharacterCount > 180}">
    <label for="newTwoot"><strong>New Twoot</strong> ({{ newTwootCharacterCount }}/180)</label>
    <textarea id="newTwoot" rows="4" v-model="newTwootContent" />

    <div class="create-twoot-panel__submit">
      <div class="create-twoot-type">
        <label for="newTwootType"><strong>Type: </strong></label>
        <select id="newTwootType" v-model="selectedTwootType">
          <option :value="option.value" v-for="(option, index) in twootTypes" :key="index">
            {{ option.name }}
          </option>
        </select>
      </div>

      <button>Twoot It!</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "CreateTwootPanel",
  data() {
    return {
      newTwootContent: '',
      selectedTwootType: 'instant',
      twootTypes: [
        { value: 'draft', name: 'Draft' },
        { value: 'instant', name: 'Instant Twoot' }
      ]
    }
  },
  computed: {
    newTwootCharacterCount() {
      return this.newTwootContent.length;
    }
  },
  methods: {
    createNewTwoot() {
      if (this.newTwootContent && this.selectedTwootType !== 'draft') {
        // When you click the submit the form, Vue will emit an event called `add-twoot`
        // to the parent, with the current state of 'this.newTwootContent'
        this.$emit('add-twoot', this.newTwootContent)
        this.newTwootContent = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.create-twoot-panel {
  display: flex;
  flex-direction: column;

  textarea {
    border: 1px solid #DFE3E8;
    border-radius: 5px;
    margin-bottom: 1rem;
  }

  .create-twoot-panel__submit {
    display: flex;
    justify-content: space-between;

    .create-twoot-type {
      padding: 10px 0;
    }

    #newTwootType {
      padding: 2px 20px;
    }

    button {
      padding: 5px 20px;
      border-radius: 5px;
      border: none;
      background-color: #094b7e;
      color: white;
      font-weight: bold;
    }
  }

  &.--exceeded {
    color: red;
    border-color: red;

    .create-twoot-panel__submit {
      button {
        background-color: red;
        color: white;
      }
    }
  }
}
</style>