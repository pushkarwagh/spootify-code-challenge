import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DiscoverItem from './DiscoverItem';
import '../styles/_discover-block.scss';
import Loader from '../../Loader';
import { fetchCategoriesList, fetchFeaturedPlaylistsList, fetchNewReleasesList } from '../../../../../redux/reducers';
import { useDispatch } from 'react-redux';

function scrollContainer(dispatch, offset, setOffset, id, { isNegative } = {}) {
  return () => {
    const scrollableContainer = document.getElementById(id);
    console.log(scrollableContainer.getBoundingClientRect())
    const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;
    scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
    // nextRef.current += 1;
    // console.log(nextRef.current)

    // released --->>> 3443
    if (id === "released" && scrollableContainer.scrollLeft >= 3769) {
      dispatch(fetchNewReleasesList(offset));
      offset >= 81 ? setOffset(0) : setOffset(offset + 20);
      scrollableContainer.scrollLeft = 0;
    }
    // featured --->>> 1243
    if (id === "featured" && scrollableContainer.scrollLeft >= 1243) {
      dispatch(fetchFeaturedPlaylistsList());
      scrollableContainer.scrollLeft = 0;
    }
    // browse --->>> 3443
    if (id === "browse" && scrollableContainer.scrollLeft >= 3769) {
      dispatch(fetchCategoriesList(offset));
      setOffset(0)
      scrollableContainer.scrollLeft = 0;
    }
  };
}


export default function DiscoverBlock({ loading, text, id, data, imagesKey = 'images' }) {
  const [offset, setOffset] = useState(21);
  // const [next, setNext] = useState(3443);
  const dispatch = useDispatch();
  const nextRef = useRef(null);

  return (
    <div className="discover-block">
      <div className="discover-block__header">
        <h2>{text}</h2>
        <span />
        {
          data?.length ? (
            <div className="animate__animated animate__fadeIn">
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={scrollContainer(dispatch, offset, setOffset, id, { isNegative: true })}
              />
              <FontAwesomeIcon
                // ref={nextRef}
                icon={faChevronRight}
                onClick={scrollContainer(dispatch, offset, setOffset, id)}
              />
            </div>
          ) : null
        }
      </div>
      {!loading ?
        <div className="discover-block__row" id={id}>
          {data?.map(({ [imagesKey]: images, name }) => (
            <DiscoverItem key={name} images={images} name={name} />
          ))}
        </div>
        :
        <Loader />
      }
    </div>
  );
}
