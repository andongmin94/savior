import React from 'react';
import styled from 'styled-components';
import SearchBar from '@/components/Search/SearchBar';
import ResultBoard from '@/components/Search/ResultBoard';
import Keyword from '@/components/Search/Keyword';

function Search(){
    return(
        <div className="grid justify-center" style={{ paddingTop: '30px', marginTop: '12vh' }}>
            <h2>통합검색</h2>
            <SearchBar/>
            <div className="flex justify-between pt-20" style={{ paddingTop: '5vh' }}>
                <ResultBoard />
                <Keyword />
            </div>
        </div>
    )
};

export default Search;