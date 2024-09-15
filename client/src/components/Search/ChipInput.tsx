import React from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";

interface ChipInputProps {
  tags: Array<string>;
  setTags: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const ChipInput = (props: ChipInputProps) => {
  return (
    <div>
      <Autocomplete
        multiple
        id="tags-filled"
        options={popularTags.map((option) => option.tag)}
        freeSolo
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip label={option} {...getTagProps({ index })} />
          ))
        }
        onChange={(event, newValue) => {
          console.log(newValue);
          props.setTags(newValue);
          console.log("tags: ", props.tags);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Tags"
            placeholder="Add your tags here"
          />
        )}
      />
    </div>
  );
};

export default ChipInput;

const popularTags = [
  { tag: "air-fryer" },
  { tag: "appetiser" },
  { tag: "beverage" },
  { tag: "blender" },
  { tag: "breakfast" },
  { tag: "brunch" },
  { tag: "dessert" },
  { tag: "dinner" },
  { tag: "gluten-free" },
  { tag: "lunch" },
  { tag: "midnight-snack" },
  { tag: "oven" },
  { tag: "pescatarian" },
  { tag: "picnic" },
  { tag: "sandwich" },
  { tag: "slow-cooker" },
  { tag: "snack" },
  { tag: "soup" },
  { tag: "themed" },
  { tag: "vegan" },
  { tag: "vegetarian" },
];
