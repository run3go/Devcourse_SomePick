import Profile from '../../assets/images/profile_image.png';
import Imoji from '../../assets/images/spriteImage.png';
import PostImg from '../../assets/images/post_image.png';
import MoreMenu from '../../components/post/MoreMenu';

export default function PostDetailPage() {
  return (
    <>
      <div className='mx-auto w-[1080px] py-[10vh]'>
        <div className='mb-[18px] mx-[7px] items-center cursor-pointer'>
          <a
            className='inline-block w-[12px] h-[10px] mr-[5px]'
            style={{
              backgroundImage: `url(${Imoji})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '-277px -765px',
            }}
          ></a>
          <a className='text-[18px]'>Back</a>
        </div>
        <article className='border w-[1080px] h-full rounded-2xl border-[#FFC7ED] bg-[#FFC7ED]/24 px-[50px] py-[30px]'>
          <header>
            <div className='flex justify-between items-center'>
              <h1 className='text-[20px]'>
                첫 데이트… 너무 귀엽고 설렜어요ㅎㅎ💓
              </h1>
              <div className='relative inline-block'>
                <a
                  className='inline-block w-[14px] h-[4px] cursor-pointer'
                  style={{
                    backgroundImage: `url(${Imoji})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '-511px -768px',
                  }}
                ></a>
                <MoreMenu />
              </div>
            </div>
            <span className='text-[16px] text-[#969696]'>
              2025년 06월 04일 17:16
            </span>
          </header>
          <hr className='my-[15px]' />
          <div className='flex gap-2.5 mb-5 items-center'>
            <img className='w-[30px] h-[30px] rounded-full' src={Profile} />
            <span className='cursor-pointer'>차은우</span>
          </div>
          <section>
            <div className='rounded-2xl bg-white mb-[30px] p-[20px]'>
              <div className=''>
                <p className='whitespace-pre-line mb-[26px] text-[16px]'>
                  어제 드디어 첫 데이트 했어요!
                  <br />
                  처음엔 서로 엄청 어색했는데, 버블티 좋아한다는 얘기 나오자마자
                  갑자기 대화 풀림ㅋㅋ
                  <br />
                  같이 산책하면서 이런저런 얘기했는데, 생각보다 너무 잘 맞는 거
                  있죠?
                  <br />
                  약간 어색+설렘 조합이라 심장 바쁜 하루였어요ㅠ
                  <br />
                  다음 약속도 잡았는데… 지금부터 또 설레는 중입니당 💗
                </p>
                <img className='w-[178.67px] h-[268px] mb-12' src={PostImg} />
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center'>
                  <span
                    className='inline-block w-[18px] h-[16px] cursor-pointer'
                    style={{
                      backgroundImage: `url(${Imoji})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: '-415px -762px',
                    }}
                  ></span>
                  <span className='ml-1 text-[14px]'>90</span>
                </div>
                <span className='text-[14px]'>2개의 댓글</span>
              </div>
            </div>
            <form>
              <textarea
                placeholder='댓글을 작성해주세요.'
                className='bg-white rounded-2xl w-[980px] resize-none px-[18px] py-[12px] text-[14px] mb-[10px] focus:outline-none focus:ring-2 focus:ring-[#FFC7ED]'
              ></textarea>
              <div className='flex w-full'>
                <button className='ml-auto rounded-[30px] bg-[#FFC7ED] px-[34px] w-[98px] h-[38px] cursor-pointer'>
                  등록
                </button>
              </div>
            </form>
          </section>
          <section className='mt-[12px]'>
            <article>
              <div className='mx-[18px]'>
                <div className='flex gap-[5px] items-center '>
                  <img
                    className='w-[33px] h-[33px] rounded-full'
                    src={Profile}
                  />
                  <div className='flex flex-col'>
                    <span className='cursor-pointer'>김지원</span>
                    <span className='text-[12px] text-[#969696]'>
                      2025.06.04 18:05
                    </span>
                  </div>
                </div>
                <div>
                  <p className='my-[12px]'>
                    헉 버블티로 대화 풀리는 거 넘 귀엽다ㅋㅋㅋ 첫 데이트 이렇게
                    달달해도 되나~? 다음 데이트 후기 꼭 알려줘요💘
                  </p>
                  <a className='text-[14px] text-[#969696] cursor-pointer'>
                    답글 달기
                  </a>
                </div>
              </div>
              <hr className='my-[12px]' />
              <form>
                <div className='flex'>
                  <span
                    className='inline-block w-[16px] h-[16px] cursor-pointer ml-[37px] mr-[7px] items-start mt-[10px]'
                    style={{
                      backgroundImage: `url(${Imoji})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: '-850px -762px',
                    }}
                  ></span>
                  <textarea
                    placeholder='댓글을 작성해주세요.'
                    className='bg-white rounded-2xl w-[918px] resize-none px-[18px] py-[12px] text-[14px] mb-[10px] focus:outline-none focus:ring-2 focus:ring-[#FFC7ED]'
                  ></textarea>
                </div>
                <div className='flex w-full'>
                  <button className='ml-auto rounded-[30px] bg-[#FFC7ED] px-[34px] w-[98px] h-[38px] cursor-pointer'>
                    등록
                  </button>
                </div>
              </form>
            </article>
            <article>
              <div className='mx-[18px]'>
                <div className='flex gap-[5px] items-center '>
                  <img
                    className='w-[33px] h-[33px] rounded-full'
                    src={Profile}
                  />
                  <div className='flex flex-col'>
                    <span className='cursor-pointer'>고윤정</span>
                    <span className='text-[12px] text-[#969696]'>
                      2025.06.04 18:05 (수정됨)
                    </span>
                  </div>
                </div>
                <div>
                  <p className='my-[12px]'>
                    보기만 해도 기분 좋아지는 후기다ㅠㅠ 약간 그 어색한 기류에
                    심장 쿵쾅거리는 느낌… 넘 알죠ㅋㅋ 두 분 잘 되시길~!!
                  </p>
                  <a className='text-[14px] text-[#969696] cursor-pointer'>
                    답글 달기
                  </a>
                </div>
              </div>
              <hr className='my-[12px]' />
              <div className='ml-[51px] mr-[18px]'>
                <div className='flex gap-[5px] items-center '>
                  <img
                    className='w-[33px] h-[33px] rounded-full'
                    src={Profile}
                  />
                  <div className='flex flex-col w-full'>
                    <div className='flex justify-between items-center'>
                      <span className='cursor-pointer'>김지원</span>
                      <div className='relative inline-block'>
                        <a
                          className='inline-block w-[14px] h-[4px] cursor-pointer'
                          style={{
                            backgroundImage: `url(${Imoji})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: '-511px -768px',
                          }}
                        ></a>
                        <MoreMenu />
                      </div>
                    </div>
                    <span className='text-[12px] text-[#969696]'>
                      2025.06.04 18:05 (수정됨)
                    </span>
                  </div>
                </div>
                <div>
                  <p className='my-[12px]'>제가 다 설레네요ㅋㅋㅋㅋ</p>
                </div>
              </div>
              <hr className='my-[12px] ml-[33px]' />
            </article>
          </section>
        </article>
      </div>
    </>
  );
}
