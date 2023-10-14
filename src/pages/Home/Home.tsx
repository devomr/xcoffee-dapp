import { AuthRedirectWrapper } from 'wrappers';
import { MxLink } from 'components/MxLink';
import { RouteNamesEnum } from 'localConstants';
import { Button } from 'components';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();


  const handleSearchButtonClick = () => {
    navigate('/creator/1234')
  };

  return (
    <AuthRedirectWrapper requireAuth={false}>
      <div className='flex flex-1 py-8 px-8 bg-white sm:flex-row items-center justify-center sm:px-20 min-h-screen'>
        <div className='flex flex-col-reverse sm:flex-row items-center h-full w-full'>
          <div className='flex items-start sm:items-center h-full sm:w-1/2 sm:bg-center'>
            <div className='flex flex-col gap-2 max-w-[70sch] text-center sm:text-left '>
              <h1 className='text-5xl font-extrabold leading-snug mb-3'>
                Get support from your <br /> fans in EGLD
              </h1>
              <p className='text-lg text-gray-500 mb-5'>
                Engage with your audience and easily get support from them in crypto currencies.
              </p>
              <MxLink to={RouteNamesEnum.unlock}
                className='bg-blue-500 text-white font-semibold py-3 px-4 rounded focus:outline-none hover:bg-blue-100 hover:text-blue-700 sm:self-start'>
                Create my xCoffee profile
              </MxLink>
            </div>
          </div>
          <div >
            Image here
          </div>
        </div>
      </div>

      <div className='flex flex-1 items-center justify-center py-8 px-8 bg-gray-100 sm:px-20 '>
        <div className='flex flex-1 flex-col items-center'>
          <h2 className='text-2xl font-extrabold leading-snug mb-3'>Looking for a creator?</h2>
          <p className='text-md text-gray-500 mb-5'>You can search your favorite creator using his wallet address</p>

          <div className='flex flex-row gap-2'>
            <input className="shadow appearance-none border rounded p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="Search by: erd..." />
            <Button
              className='bg-blue-500 text-white font-semibold py-3 px-4 rounded focus:outline-none hover:bg-blue-100 hover:text-blue-700 w-auto'
              onClick={handleSearchButtonClick}>
              Search creator
            </Button>

          </div>
        </div>
      </div>


    </AuthRedirectWrapper>
  );
};
