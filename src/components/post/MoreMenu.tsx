import Imoji from '../../assets/images/spriteImage.png';

export default function MoreMenu() {
  return (
    <>
      <div className='absolute right-0 mt-2 bg-white p-2.5 rounded-[10px] border flex flex-col w-[82px] z-50'>
        <div className='flex items-center gap-[5px] pb-2.5'>
          <button className='text-[12px] cursor-pointer'>수정하기</button>
          <a
            className='inline-block w-[12px] h-[12px] cursor-pointer'
            style={{
              backgroundImage: `url(${Imoji})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '-556px -764px',
            }}
          ></a>
        </div>
        <div className='flex items-center gap-[5px]'>
          <button className='text-[#E94235] text-[12px] cursor-pointer'>
            삭제하기
          </button>
          <a
            className='inline-block w-[12px] h-[13px] cursor-pointer'
            style={{
              backgroundImage: `url(${Imoji})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '-597px -763px',
            }}
          ></a>
        </div>
      </div>
    </>
  );
}
