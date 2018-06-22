export const mixin = {
  created() {
    const watchers = [];

    Object.entries(this.$options.props || {}).forEach(([prop, opts]) => {
      if (opts.sync) {
        watchers.push(
          this.$watch(prop, val => {
            this[opts.sync] = val;
          }),
          this.$watch(opts.sync, val => {
            if (val !== this[prop]) {
              this.$emit(`update:${prop}`, val);
            }
          })
        );
        this[opts.sync] = this[prop];
      }
    });

    this.$once("beforeDestroy", () => {
      watchers.forEeach(unwatch => unwatch());
    });
  }
};

export default (Vue) => {
  Vue.mixin(mixin)
}
