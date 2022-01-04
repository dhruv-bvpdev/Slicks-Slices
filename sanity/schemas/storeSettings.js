import { MdStore as icon } from "react-icons/md";

export default {
  name: "storeSettings",
  title: "Settings",
  type: "document",
  icon,
  fields: [
    {
      name: "name",
      title: "Store Name",
      type: "string",
      description: "Name of Store",
    },
    {
      name: "slicemaster",
      title: "Slicemaster Currently Slicing",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    },
    {
      name: "hotslices",
      title: "Hot Slices available in the case",
      type: "array",
      of: [{ type: "reference", to: [{ type: "pizza" }] }],
    },
  ],
};
