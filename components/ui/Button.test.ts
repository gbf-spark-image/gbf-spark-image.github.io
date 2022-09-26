import { mount } from "@vue/test-utils";
import Button from "./Button.vue";

describe("UI Button", () => {
  it("should exist", () => {
    const wrapper = mount(Button);
    expect(wrapper).toBeDefined();
  });
  it("should be a button", () => {
    const wrapper = mount(Button);
    expect(wrapper.find("button").exists()).toBe(true);
  });
  it("should accept a default slot", () => {
    const wrapper = mount(Button, {
      slots: { default: "test" },
    });
    expect(wrapper.text()).toContain("test");
  });
});
