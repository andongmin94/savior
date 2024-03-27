import FilterChips from '@/components/FilterChips';
import LoginModal from '@/components/LoginModal';

function isLogin() {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    return false;
  }
}

export default function CustomFilter() {
  return (
    <>
    <div className='grid'>
      {isLogin() ? (
        <div className='flex py-[10%] px-[10%] w-[100vw] h-[100vh] bg-[url("/background/waves.svg")]'>
          <FilterChips />
        </div>
      ) : (
          <LoginModal />
      )}
    </div>
  );
}
