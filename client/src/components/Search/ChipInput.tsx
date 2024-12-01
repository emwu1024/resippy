import React, { useEffect, useState } from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";
import axios from "axios";
import "./ChipInpux.css";

interface ChipInputProps {
  tags: Array<string>;
  setTags: React.Dispatch<React.SetStateAction<Array<string>>>;
  searchPost?: () => void;
  handleKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ChipInput = (props: ChipInputProps) => {
  const [tagSet, setTagSet] = useState<string[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:8000/recipes/tags");
        setTagSet(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    if (props.searchPost) {
      props.searchPost();
    }
  }, [props.tags]);

  return (
    <div>
      <Autocomplete
        className="chipinput-styling"
        multiple
        id="tags-filled"
        options={tagSet.map((option) => option)}
        freeSolo
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip label={option} {...getTagProps({ index })} />
          ))
        }
        value={props.tags}
        onChange={(event, newValue) => {
          props.setTags(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Tags"
            placeholder="Add your tags here"
            sx={{
              "& .MuiFilledInput-root": {
                backgroundColor: "transparent",
              },
              "& .MuiFilledInput-underline:before": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default ChipInput;
