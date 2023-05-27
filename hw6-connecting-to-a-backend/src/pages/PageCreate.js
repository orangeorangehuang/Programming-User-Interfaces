import React from 'react';
import base_img from '../assets/images/shirt-base.png';
import { sizes } from '../shared';
import { scotties } from '../assets/images';
import { createApi } from 'unsplash-js';
import { useStateContext } from '../contexts/ContextProvider';
import { insertDocument } from '../firebase';
import { useNavigate } from 'react-router-dom';
import mockData from '../shared/tempResults.json';

const PageCreate = () => {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    userInfo,
    queryResult,
    setQueryResult,
    queryString,
    setQueryString,
    queryColor,
    setQueryColor,
    queryPageNum,
    setQueryPageNum,
    queryOrient,
    setQueryOrient,
    queryOrder,
    setQueryOrder,
    selectedResult,
    setSelectedResult,
    advance,
    setAdvance,
    sizeCreate,
    setSizeCreate,
    quantityCreate,
    setQuantityCreate,
    updateCart,
  } = useStateContext();

  const quan_options = [...Array(20).keys()].map((num) => {
    return (
      <option key={num} value={num + 1}>
        {num + 1}
      </option>
    );
  });

  const size_options = sizes.map((s) => {
    return (
      <option key={s} value={s}>
        {s}
      </option>
    );
  });

  const orientation_options = ['none', 'landscape', 'portrait', 'squarish'].map((s) => {
    return (
      <option key={s} value={s}>
        {s}
      </option>
    );
  });

  const orderBy_options = ['default', 'latest', 'oldest'].map((s) => {
    return (
      <option key={s} value={s}>
        {s}
      </option>
    );
  });

  const getUnsplashData = async (isNew) => {
    const unsplash = createApi({ accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY });
    let queryObject = isNew
      ? {
          query: queryString,
          page: 1,
          perPage: 10,
        }
      : {
          query: queryString,
          page: queryPageNum,
          perPage: 10,
        };
    if (queryColor !== '') queryObject['color'] = queryColor;
    // orientation: landscape, portrait, squarish
    if (queryOrient !== '' && queryOrient !== 'none') queryObject['orientation'] = queryOrient;
    // orderBy: latest, oldest
    if (queryOrder !== '') queryObject['orderBy'] = queryOrder;

    console.log(queryObject);
    console.log('pageNum = ', queryPageNum);
    await unsplash.search.getPhotos(queryObject).then((result) => {
      if (result.type === 'success') {
        isNew ? setQueryResult(result.response.results) : setQueryResult([...queryResult, ...result.response.results]);
        console.log(result.response);
        if (isNew) {
          setQueryPageNum(2);
          document.getElementById('create-picture-submit-more').classList.remove('create-picture-submit-disabled');
        } else if (result.response.total_pages <= queryPageNum) {
          document.getElementById('create-picture-submit-more').classList.add('create-picture-submit-disabled');
        } else {
          let num = queryPageNum;
          setQueryPageNum(num + 1);
          document.getElementById('create-picture-submit-more').classList.remove('create-picture-submit-disabled');
        }
      }
    });

    // setQueryResult(mockData.results);
    // console.log(mockData.results);
  };

  // getUnsplashData('cat', 10, 'white');
  // useEffect(() => {
  //   setQueryString('cat');
  //   setQueryPageNum(2);
  // });

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleNewSearch();
    }
  };

  const handleClickImage = (event) => {
    setSelectedResult(event.target.src);
  };

  const handleClickAdvance = () => {
    let item = document.getElementsByClassName('create-picture-advance-input')[0];
    if (advance) item.classList.add('create-picture-advance-item-none');
    else item.classList.remove('create-picture-advance-item-none');
    let newVal = !advance;
    setAdvance(newVal);
  };

  const handleDisplayMore = () => {
    getUnsplashData(false);
  };

  const handleNewSearch = () => {
    setQueryPageNum(1);
    getUnsplashData(true);
  };

  const handleCartAdd = async () => {
    // selectedResult, sizeCreate, quantityCreate
    if (isLoggedIn && sizeCreate !== '' && selectedResult !== '') {
      let name;
      if (queryString === '') name = 'scotty';
      else name = queryString;

      let time = new Date().getTime();
      await insertDocument(userInfo.uid, name, base_img, selectedResult, quantityCreate, null, sizeCreate, '$20.00', time);
      updateCart(userInfo.uid);
      console.log('insert cart');
      navigate('/cart');
    }
  };

  return (
    <div className='create-picture-wrapper'>
      <div className='create-picture-left'>
        <div className='create-picture-preview-box'>
          <img className='create-picture-preview-img' alt='preview' src={base_img} />
          <div className='create-picture-preview-add'>
            {selectedResult ? <img className='create-picture-preview-selected' src={selectedResult} alt='selected'></img> : <></>}
          </div>
        </div>
        <div className='create-picture-price'>$20.00</div>
        <div className='create-picture-content'>
          <div className='create-picture-title'>Quantity: </div>
          <div className='create-picture-button-box'>
            <select
              className='create-picture-quan-select'
              value={quantityCreate}
              onChange={(e) => {
                setQuantityCreate(e.target.value);
              }}
            >
              {quan_options}
            </select>
          </div>
        </div>
        <div className='create-picture-content'>
          <div className='create-picture-title'>Size: </div>
          <div className='create-picture-button-box'>
            <select
              className='create-picture-size-select'
              value={sizeCreate}
              onChange={(e) => {
                setSizeCreate(e.target.value);
              }}
            >
              <option value=''>Size</option>
              {size_options}
            </select>
          </div>
        </div>
        <div
          id='create-picture-submit'
          className={
            isLoggedIn && sizeCreate !== '' && selectedResult !== ''
              ? 'create-picture-submit'
              : 'create-picture-submit create-picture-submit-disabled'
          }
          onClick={handleCartAdd}
        >
          Add to Cart
        </div>
      </div>
      <div className='create-picture-right'>
        <div className='create-picture-right-top'>
          <input
            className='create-picture-search'
            type='text'
            placeholder='Search for pictures'
            value={queryString}
            onChange={(event) => setQueryString(event.target.value)}
            onKeyDown={handleKeyDown}
          ></input>
          <div className='create-picture-search-submit' onClick={handleNewSearch}>
            Search
          </div>
          <div className='create-picture-search-advance' onClick={handleClickAdvance}>
            Advanced Search
          </div>
        </div>
        <div className='create-picture-advance-input create-picture-advance-item-none'>
          <div className='create-picture-advance-item'>
            orientation:{' '}
            <select
              onChange={(e) => {
                setQueryOrient(e.target.value);
              }}
            >
              {orientation_options}
            </select>
          </div>
          <div className='create-picture-advance-item'>
            order by:{' '}
            <select
              onChange={(e) => {
                setQueryOrder(e.target.value);
              }}
            >
              {orderBy_options}
            </select>
          </div>
          <div className='create-picture-advance-item'>
            color:{' '}
            <input
              type='text'
              placeholder='Color'
              onChange={(e) => {
                setQueryColor(e.target.value);
              }}
              value={queryColor}
            ></input>
          </div>
        </div>
        <div className='create-picture-main'>
          {queryResult.length === 0 ? (
            <div className='create-picture-null'>
              <div className='create-picture-null-title'>No search results. Maybe use a scotty?</div>
              <div className='create-picture-null-items'>
                {scotties.map((s, id) => {
                  return (
                    <div key={id} id={id} src={s} className='create-picture-item' onClick={handleClickImage}>
                      <img className='create-picture-img' id={id} src={s} alt='scotty' onClick={handleClickImage} />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className='create-picture-many'>
              <div className='create-picture-items'>
                {queryResult.map((s, id) => {
                  return (
                    <div key={id} id={id} src={s.links.download} className='create-picture-item' onClick={handleClickImage}>
                      <img className='create-picture-img' id={id} src={s.links.download} alt={id} onClick={handleClickImage} />
                    </div>
                  );
                })}
              </div>
              <div className='create-picture-submit' id='create-picture-submit-more' onClick={handleDisplayMore}>
                Display More
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageCreate;
