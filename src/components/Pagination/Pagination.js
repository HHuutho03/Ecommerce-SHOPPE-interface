import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentItems: null,
      pageCount: 1,
      itemOffset: 0,
      itemPerPage: 10,
    };
  }
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      let dataProps = this.props.data;
      if (dataProps && dataProps.length > 0) {
        this.setState({ data: dataProps }, () => {
          let { data, itemOffset, itemPerPage } = this.state;
          let endOffset = +itemOffset + +itemPerPage;
          this.setState(
            {
              pageCount: Math.ceil(data.length / itemPerPage),
              currentItems: data.slice(itemOffset, endOffset),
            },
            () => {
              this.props.handleGetDataFromParent(this.state.currentItems);
            }
          );
        });
      }
    }

    if (prevState.itemOffset !== this.state.itemOffset) {
      let { data, itemOffset, itemPerPage } = this.state;
      let endOffset = +itemOffset + +itemPerPage;
      this.setState(
        {
          pageCount: Math.ceil(data.length / itemPerPage),
          currentItems: data.slice(itemOffset, endOffset),
        },
        () => {
          this.props.handleGetDataFromParent(this.state.currentItems);
        }
      );
    }
  }
  handlePageClick = (event) => {
    let { data, itemPerPage } = this.state;
    const newOffset = (event.selected * itemPerPage) % data.length;

    this.setState({
      itemOffset: newOffset,
    });
  };

  render() {
    let { pageCount } = this.state;

    return (
      <ReactPaginate
        breakLabel="..."
        nextLabel="&raquo;"
        onPageChange={(event) => {
          this.handlePageClick(event);
        }}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="&laquo;"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    );
  }
}
