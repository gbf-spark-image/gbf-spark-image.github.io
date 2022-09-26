import { mount, RouterLinkStub } from "@vue/test-utils";
import LinkButton from "./LinkButton.vue";
import NuxtLink from "nuxt/app";

describe("UI Link Button", () => {
  it("should exist", () => {
    const wrapper = mount(LinkButton);
    expect(wrapper).toBeDefined();
  });

  it("should be a NuxtLink", () => {
    const wrapper = mount(LinkButton);
    expect(wrapper.find("NuxtLink").exists()).toBe(true);
  });

  it("should accept a default slot", () => {
    const wrapper = mount(LinkButton, {
      slots: { default: "test" },
    });
    expect(wrapper.html()).toContain("test");
  });

  it("should accept a `to` prop", () => {
    const wrapper = mount(LinkButton, {
      props: { to: { path: "/test" } },
    });
    expect(wrapper.props("to")).toMatchObject({ path: "/test" });
  });
});
