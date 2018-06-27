/*
 * People container
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { debounce } from 'lodash';

import MakerCard from 'components/MakerCard';
import { getGameURLFromId } from '../../utils/hashingFunction';

import { selectUser } from 'containers/App/selectors';
import {
  selectPeople,
  selectSearch,
  selectIsSearching,
  selectOffset,
  selectIsFetching,
  selectIsLastPage,
} from './selectors';

import {
  peopleRequest,
  toggleSearch,
  searchPeopleRequest,
  nextPageRequest,
} from './actions';

import s from './styles.css';

class People extends Component {
  componentDidMount() {
    this.props.onGetPeople();
    window.addEventListener('scroll', this.handleNextPageRequest);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleNextPageRequest);
  }

  handleSearch = debounce(this.props.onSearchPeople, 300);

  handleNextPageRequest = () => {
    const { onGetNextPage, isFetching, isSearching, isLastPage, offset } = this.props;
    const url = isSearching ? 'searchmaker' : 'browse/makers';
    const query = this.searchInput.value;
    if (((window.innerHeight + window.scrollY) / document.body.scrollHeight) >= 0.95) {
      !isFetching && !isLastPage && onGetNextPage(url, offset, query); // eslint-disable-line
    }
  }

  render() {
    const { user: { id, maker },  doc, people, search, isSearching, onToggleSearch, isFetching, isLastPage } = this.props;

    // isSearching = true, use search data, else people data.
    const peopleList = (isSearching ? search : people).filter(p => p.id !== id);
    const getMaker = (isSearching ? search : people).filter(p => p.id == id);
    let m = getMaker[0] || null; // eslint-disable-line
    return (
      <main role="main" className={s.root}>
        <div className={s.top}>
          <h1>People</h1>
          <div className={s.search}>
            <input
              type="text"
              ref={input => this.searchInput = input} // eslint-disable-line

              onChange={(e) => {
                // this case handles when the user already searching AND is
                // typing more: do a request, don't toggle isSearching
                if (isSearching && e.target.value.trim()) {
                  this.handleSearch(e.target.value);
                } else {
                  // this case handles when the user is starting or stoping the search
                  // only send a request when the user is starting to search
                  // i.e. isSearching is false but we just got an input.
                  !isSearching && this.handleSearch(e.target.value);  // eslint-disable-line
                  // for both, flip the value of isSearching
                  onToggleSearch();
                }
              }}
              placeholder="Name or Game"/>
            <i className="icon-search" />
          </div>
        </div>
        <div className={s.makers}>
          {m && <MakerCard
            id={id}
            currID={id}
            avatar={m.imgUrl}
            firstName={m.firstName}
            lastName={m.lastName}
            currRole={m.currRole}
            currGame={m.currGame}
            width={doc.width}
            currCompany={m.currCompany}
            connection="no"
            claimed
            imageSm={m.additionalInfo ? m.additionalInfo[0].latestGameId ? getGameURLFromId(m.additionalInfo[0].latestGameId.toString(), '550x740') : getGameURLFromId((Math.floor((Math.random() * 3000) + 0)).toString(), '550x740') :null}
            imageLg={m.additionalInfo ? m.additionalInfo[0].latestGameId ? getGameURLFromId(m.additionalInfo[0].latestGameId.toString(), '1500x400') : getGameURLFromId((Math.floor((Math.random() * 3000) + 0)).toString(), '550x740') : null}
            timesVerified={m.additionalInfo ? m.additionalInfo[0].timesVerified : null}/> }
          {peopleList && peopleList.length > 0 && peopleList
            .map((p, idx) => (
              <MakerCard
                key={idx}
                id={p.id}
                currID={id}
                avatar={p.imgUrl}
                firstName={p.firstName}
                lastName={p.lastName}
                currRole={p.currRole}
                currGame={p.currGame}
                width={doc.width}
                currCompany={p.currCompany}
                connection={p.connected ? 'yes' : p.connectPending ? 'pending' : 'no'}
                claimed={p.claimed}
                imageSm={p.additionalInfo ? p.additionalInfo[0].latestGameId ? getGameURLFromId(p.additionalInfo[0].latestGameId.toString(), '550x740') : getGameURLFromId((Math.floor((Math.random() * 3000) + 0)).toString(), '550x740') : null}
                imageLg={p.additionalInfo ? p.additionalInfo[0].latestGameId ? getGameURLFromId(p.additionalInfo[0].latestGameId.toString(), '1500x400') : getGameURLFromId((Math.floor((Math.random() * 3000) + 0)).toString(), '550x740') : null}
                timesVerified={p.additionalInfo ? p.additionalInfo[0].timesVerified : null}/>
            ))}
          {isFetching &&
          <div style={{ marginTop: '2rem' }}>
            <h3>Loading</h3>
            <div className={`loader ${s.loading}`}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          }
          {isLastPage && <h4 style={{ marginTop: '2rem' }}>No more results</h4>}
        </div>
      </main>
    );
  }
}

People.propTypes = {
  doc: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  offset: PropTypes.number,
  isSearching: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  people: PropTypes.array.isRequired,
  search: PropTypes.array.isRequired,
  onToggleSearch: PropTypes.func.isRequired,
  onGetPeople: PropTypes.func.isRequired,
  onSearchPeople: PropTypes.func.isRequired,
  onGetNextPage: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    people: selectPeople(),
    search: selectSearch(),
    isSearching: selectIsSearching(),
    offset: selectOffset(),
    isFetching: selectIsFetching(),
    isLastPage: selectIsLastPage(),
  }),
  dispatch => ({
    dispatch,
    onGetPeople: () => dispatch(peopleRequest()),
    onToggleSearch: () => dispatch(toggleSearch()),
    onSearchPeople: query => dispatch(searchPeopleRequest(query)),
    onGetNextPage: (url, offset, query) => dispatch(nextPageRequest(url, offset, query)),
  })
)(People);
