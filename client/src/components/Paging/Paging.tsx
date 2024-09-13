import React, { useEffect, useState } from "react";
import "./Paging.css";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

interface PagingProps {
  page: number;
}

const Paging = ({ page }: PagingProps) => {
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    const fetchRecipes = async (page: number) => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/recipes?page=${page}`
        );
        setNumberOfPages(data.numberOfPages);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    if (page) {
      fetchRecipes(page);
    }
  }, [page]);

  return (
    <div className="pagination-container">
      <Pagination
        count={numberOfPages}
        color="primary"
        showFirstButton
        showLastButton
        page={page || 1}
        // renderItem={(item) => {
        //   <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />;
        // }}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/recipes?page=${item.page}`}
          />
        )}
      />
    </div>
  );
};

export default Paging;
