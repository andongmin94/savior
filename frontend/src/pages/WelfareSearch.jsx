import SearchBar from '@/components/Search/SearchBar';
import Keyword from '@/components/Search/Keyword';
import ResultBoard from '@/components/Search/ResultBoard';

export default function Search(){
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
