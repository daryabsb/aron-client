<template>
  <button :class="classes" class="h-16 px-8 p-3 rounded-sm focus:outline-none active:bg-gray-400" @keydown.enter.prevent
    @keydown.space.prevent>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    variant: { type: String, default: "blue" },
  },

  setup(props) {
    const variantsClasses = {
      yellow: "bg-yellow-600 hover:bg-yellow-500",
      blue: "bg-blue-600 hover:bg-blue-500",
      green: "bg-green-600 hover:bg-green-500",
      red: "bg-red-700 hover:bg-red-500",
      transRed:
        "bg-transparent hover:bg-red-700 border border-red-700 text-red-700 hover:text-white",
      transGreen:
        "bg-transparent hover:bg-green-700 border border-green-700 text-green-700 hover:text-white",
      transYellow:
        "bg-transparent hover:bg-yellow-600 border border-yellow-600 text-yellow-600 hover:text-white",

      gray: "bg-gray-800 hover:bg-gray-700",
      transparent:
        "bg-transparent hover:bg-gray-500 border border-gray-500 text-white",
    };

    return { classes: variantsClasses[props.variant] };
  },
};
</script>
