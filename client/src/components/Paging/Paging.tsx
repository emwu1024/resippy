import React from "react";
import "./Paging.css";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";

const Paging = () => {
  return (
    <div className="pagination-container">
      <Pagination
        count={10}
        color="primary"
        showFirstButton
        showLastButton
        page={1}
        // renderItem={(item) => {
        //   <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />;
        // }}
        renderItem={(item) => (
          <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
        )}
      />
    </div>
  );
};

export default Paging;
