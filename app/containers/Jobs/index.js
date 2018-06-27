/*
 * Jobs container
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { createStructuredSelector } from 'reselect';

import {
  jobsRequest,
  searchJobsRequest,
  nextPageRequest,
  toggleSearch,
} from './actions';

import {
  selectJobs,
  selectSearch,
  selectIsSearching,
  selectIsFetching,
  selectOffset,
  selectIsLastPage,
} from './selectors';

import JobCard from 'components/JobCard';

import s from './styles.css';

class Jobs extends Component {
  componentDidMount() {
    const { onGetJobs } = this.props;
    onGetJobs();
    window.addEventListener('scroll', this.handleNextPageRequest);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleNextPageRequest);
  }

  handleSearch = debounce(this.props.onSearchJobs, 300);

  handleNextPageRequest = () => {
    const { onGetNextPage, isFetching, isSearching, isLastPage, offset } = this.props;
    const url = isSearching ? 'searchjob' : 'browse/jobs';
    const query = this.searchInput.value;
    if (((window.innerHeight + window.scrollY) / document.body.scrollHeight) >= 0.95) {
      !isFetching && !isLastPage && onGetNextPage(url, offset, query);
    }
  }

  render() {
    const { isFetching, jobs, isLastPage, isSearching } = this.props;
    return (
      <main role="main" className={s.root}>
        <div className={s.top}>
          <h1>Jobs</h1>
          <div className={s.search}>
            <input
              type="text"
              ref={input => this.searchInput = input}
              onChange={(e) => {
                // this case handles when the user already searching AND is
                // typing more: do a request, don't toggle isSearching
                if (isSearching) {
                  this.handleSearch(e.target.value);
                } else {
                  // this case handles when the user is starting or stoping the search
                  // only send a request when the user is starting to search
                  // i.e. isSearching is false but we just got an input.
                  !isSearching && this.handleSearch(e.target.value);  // eslint-disable-line
                  // for both, flip the value of isSearching
                  this.props.toggleSearch();
                }
              }}
            placeholder="Job Title / Location"/>
            <i className="icon-search" />
          </div>
        </div>
        <div className={s.jobs}>
          {jobs && jobs.length > 0 ? jobs
            .map((j, idx) => (
              <JobCard
                key={idx}
                id={j.id}
                title={j.role.name}
                applied={j.applied}
                location={j.location} />
            )) : <h3>There are no jobs to display</h3>}
          {isFetching &&
            <div>
              <h3>Loading</h3>
              <div className="loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>}
          {isLastPage && <h3>No more results</h3>}
        </div>
      </main>
    );
  }
}

Jobs.propTypes = {
  params: PropTypes.object.isRequired,
  search: PropTypes.array.isRequired,
  offset: PropTypes.number,
  toggleSearch: PropTypes.func,
  isSearching: PropTypes.bool,
  isFetching: PropTypes.bool,
  jobs: PropTypes.array.isRequired,
  onGetJobs: PropTypes.func.isRequired,
  onSearchJobs: PropTypes.func.isRequired,
  onGetNextPage: PropTypes.func.isRequired,
  isLastPage: PropTypes.bool,
};

export default connect(
  createStructuredSelector({
    jobs: selectJobs(),
    search: selectSearch(),
    isSearching: selectIsSearching(),
    isFetching: selectIsFetching(),
    offset: selectOffset(),
    isLastPage: selectIsLastPage(),
  }),
  dispatch => ({
    dispatch,
    onGetJobs: () => dispatch(jobsRequest()),
    toggleSearch: () => dispatch(toggleSearch()),
    onSearchJobs: query => dispatch(searchJobsRequest(query)),
    onGetNextPage: (url, offset, query) => dispatch(nextPageRequest(url, offset, query)),
  })
)(Jobs);
