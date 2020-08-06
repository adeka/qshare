import { selector } from "recoil";
import { textState } from "JS/atoms";

export const currentCountState = selector({
  key: "currentCountState",
  get: ({ get }) => {
    const count = get(textState);

    return count;
  }
});
