import { mount } from "@vue/test-utils";
import Modal from "./Modal.vue";

describe("UI Modal", () => {
  it("should exist", () => {
    const wrapper = mount(Modal);
    expect(wrapper).toBeDefined();
  });

  it("should be a teleport", () => {
    const wrapper = mount(Modal);
    expect(wrapper.html()).toContain("teleport");
  });

  it("should have an `active` prop with `false` as default value", () => {
    const wrapper = mount(Modal);
    expect(wrapper.props("active")).toBe(false);
  });

  it("should render when `active` is `true`", async () => {
    const wrapper = mount(Modal, {
      global: {
        stubs: {
          teleport: true,
        },
      },
    });
    await wrapper.setProps({ active: false });
    expect(wrapper.findAll("*").length).toBe(2); //teleport + transition
    await wrapper.setProps({ active: true });
    expect(wrapper.findAll("*").length).toBeGreaterThan(2);
  });

  it("should accept a default slot", () => {
    const wrapper = mount(Modal, {
      global: {
        stubs: {
          teleport: true,
        },
      },
      props: { active: true },
      slots: { default: "test" },
    });
    expect(wrapper.text()).toContain("test");
  });

  it("should emit a `deactivate` event when clicking outside or the close icon", () => {
    const wrapper = mount(Modal, {
      global: {
        stubs: {
          teleport: true,
        },
      },
      props: { active: true },
    });
    const closeButton = wrapper.find("button");
    closeButton.trigger("click");
    expect(wrapper.emitted().deactivate).toHaveLength(1);
    const outside = wrapper.find("#outside");
    outside.trigger("mousedown");
    outside.trigger("mouseup");
    expect(wrapper.emitted().deactivate).toHaveLength(2);
    const inside = outside.find("#inside");
    inside.trigger("mousedown");
    inside.trigger("mouseup");
    expect(wrapper.emitted().deactivate).toHaveLength(2);
  });
});
