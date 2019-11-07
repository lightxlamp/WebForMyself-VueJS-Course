export default {
  // binds to shadow DOM, vnode = virtual node. Bindings and vnode are read-only parameters
  bind(el, bindings, vnode){
    console.log('Bind');
    el.style.color = 'red';
  },

  // calls when element inserted to a real DOM
  inserted(el, bindings, vnode){
    console.log('Inserted');
  },

  //This methods call only in case when a parent object was updated (but child object were not updated)
  update(el, bindings, vnode, oldVnode){
    console.log('Updated');
  },

  //Call when child elements were updated too
  componentUpdated(el, bindings, vnode, oldVnode) {
    console.log('Component Updated');
  },

  // Calls when directive stops her existence. And removing from a DOM tree
  // Similar to onDestroy, destroyed
  unbind() {
    console.log('Unbind');
  }
}
