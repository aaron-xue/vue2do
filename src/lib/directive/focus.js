import Vue from 'vue'

export default {
  priority: 1000,

  inserted(el, binding) {
    binding.zBound = true

    binding.zFocus = () => {
      if (binding.zBound) {
        el.focus()
      }
    }

    binding.zBlur = () => {
      if (binding.zBound) {
        el.blur()
      }
    }
  },

  update(el, binding) {
    if (binding.value) {
      Vue.nextTick(binding.zFocus)
    } else {
      Vue.nextTick(binding.zBlur)
    }
  },

  unbind(el, binding) {
    binding.zBound = false
  }
}