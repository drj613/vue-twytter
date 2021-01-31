<template>
  <form class="create-twoot-panel" @submit.prevent="createNewTwoot" :class="{ '--exceeded': newTwootCharacterCount > 180}">
    <label for="newTwoot"><strong>New Twoot</strong> ({{ newTwootCharacterCount }}/180)</label>
    <textarea id="newTwoot" rows="4" v-model="state.newTwootContent" />

    <div class="create-twoot-panel__submit">
      <div class="create-twoot-type">
        <label for="newTwootType"><strong>Type: </strong></label>
        <select id="newTwootType" v-model="state.selectedTwootType">
          <option :value="option.value" v-for="(option, index) in state.twootTypes" :key="index">
            {{ option.name }}
          </option>
        </select>
      </div>

      <button>Twoot It!</button>
    </div>
  </form>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  name: "CreateTwootPanel",
  setup(props, ctx) {
    const state = reactive({
      newTwootContent: '',
      selectedTwootType: 'instant',
      twootTypes: [
        { value: 'draft', name: 'Draft' },
        { value: 'instant', name: 'Instant Twoot' }
      ]
    })

    const newTwootCharacterCount = computed(() => state.newTwootContent.length);

    function createNewTwoot() {
      if (state.newTwootContent && state.selectedTwootType !== 'draft') {
        // When you click the submit the form, Vue will emit an event called `add-twoot`
        // to the parent, with the current state of 'this.newTwootContent'
        ctx.emit('add-twoot', state.newTwootContent);
        state.newTwootContent = '';
      }
    }

    return {
      state,
      newTwootCharacterCount,
      createNewTwoot
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