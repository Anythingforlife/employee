import { shallowMount } from "@vue/test-utils";
import Sample from "@/components/sample.vue";

describe("Sample.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "sample app";
    const wrapper = shallowMount(Sample, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});