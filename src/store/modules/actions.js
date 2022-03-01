import DB from "../../../firebase/index";
import router from "../../router/index";
export default {
   mutations: {
      async getActionsRow(state, link) {
         const actions = await DB.getData(link);
         if (actions) {
            state.actions = actions;
         }
      },
      async addActionNew(state, array) {
         state.actions.push(array[0]);
         let dateRU = state.actions[state.actions.length - 1].ru.date;
         let dateUK = state.actions[state.actions.length - 1].uk.date;
         state.actions[state.actions.length - 1].ru.date = dateRU.toString();
         state.actions[state.actions.length - 1].uk.date = dateUK.toString();
         await DB.sendData(array[1], state.actions).then(() => {
            router.push({ path: "/actions" });
         });
      },
      async saveAction(state, array) {
         state.actions[array[1]] = array[0];
         let dateRU = state.actions[array[1]].ru.date;
         let dateUK = state.actions[array[1]].uk.date;
         state.actions[array[1]].ru.date = dateRU.toString();
         state.actions[array[1]].uk.date = dateUK.toString();
         await DB.sendData(`${array[2]}/${array[1]}`, state.actions[array[1]]).then(() => {
            router.push({ path: "/actions" });
         });
      },
      async deleteActionItem(state, index) {
         state.actions.splice(index, 1);
         await DB.sendData('actions', state.actions);
      }
   },
   state: {
      actions: []
   },
   getters: {
      getActionsRow(state) {
         return state.actions;
      }
   },
   actions: {
      getActions(context, link) {
         context.commit('getActionsRow', link)
      },
      addNewAction(context, array) {
         context.commit('addActionNew', array);
      },
      saveItemAction(context, array) {
         context.commit('saveAction', array)
      },
      deleteAction(context, index) {
         context.commit('deleteActionItem', index);
      }
   },
};
