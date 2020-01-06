import { shallowMount } from "@vue/test-utils";
import Sample from "@/components/sample.vue";

describe("Sample.vue", () => {

  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(Sample, {
      propsData: {
        title: 'sample App'
      }
    })
  })

  afterEach(() => {
    wrapper.destroy();
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it("renders props.title when passed", () => {
    expect(wrapper.text()).toMatch('sample App');
  });

  test('adds 1 + 2 to equal 3', () => {
    expect(wrapper.vm.sum(1, 2)).toBe(3);
  });


});