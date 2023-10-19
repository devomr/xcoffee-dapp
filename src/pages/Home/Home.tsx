import { AuthRedirectWrapper } from 'wrappers';
import { Button, CreatorCard } from 'components';
import { useNavigate } from 'react-router-dom';
import { findCreatorByAddress, findLastCreators } from 'services/creators.service';
import { useEffect, useState } from 'react';
import { RouteNamesEnum } from 'localConstants';
import { Creator } from 'types/creator.types';
import { buildRouteWithCallback } from 'utils';

export const Home = () => {
  const navigate = useNavigate();

  // State for showing the last creators registered
  const [lastCreators, setLastCreators] = useState<Creator[]>([]);

  // State for search input
  const [search, setSearch] = useState('');

  const fetchLastCreators = async () => {
    try {
      const response = await findLastCreators();

      if (!response) {
        return;
      }

      setLastCreators(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLastCreators();
  }, []);



  const handleSearchButtonClick = async () => {
    const response = await findCreatorByAddress(search);

    if (!response) {
      alert('Creator not found');
      return;
    }

    const creator: Creator = response.data;
    navigate(`/creator/${creator.address}`);
  };

  const handleCreateProfile = () => {
    navigate(buildRouteWithCallback(RouteNamesEnum.unlock, RouteNamesEnum.setupProfile));
  };

  return (
    <AuthRedirectWrapper requireAuth={false}>
      <div className='flex flex-1 py-8 px-8 bg-white sm:flex-row items-center justify-center sm:px-20 sm:py-40'>
        <div className='flex flex-col items-center justify-center h-full w-full'>
          <h1 className='text-6xl font-bold leading-snug text-center mb-3'>
            Get support from your <br /> fans in <span className='text-teal-500 font-extrabold'>EGLD</span>
          </h1>
          <p className='text-lg text-gray-500 mb-5'>
            Engage with your audience and easily get support from them in crypto currencies.
          </p>
          <Button
            className='bg-blue-700 text-white font-semibold py-3 px-4 rounded focus:outline-none hover:bg-blue-100 hover:text-blue-700 w-auto'
            onClick={handleCreateProfile}>
            Create my xCoffee profile
          </Button>

        </div>
      </div>

      <div className='flex flex-1 items-center justify-center py-16 px-8 bg-blue-50 sm:px-20 '>
        <div className='flex flex-1 flex-col items-center'>
          <h2 className='text-2xl font-extrabold leading-snug mb-3'>Looking for a creator?</h2>
          <p className='text-md text-gray-500 mb-5'>You can search your favorite creator using his wallet address</p>

          <div className='flex flex-row gap-2'>
            <input className="shadow appearance-none border rounded p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="Search by: erd..."
              name='address' value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button
              className='bg-blue-700 text-white font-semibold py-3 px-4 rounded focus:outline-none hover:bg-blue-100 hover:text-blue-700 w-auto'
              onClick={handleSearchButtonClick}>
              Search creator
            </Button>

          </div>
        </div>
      </div>

      <div className='flex flex-1 items-center justify-center py-16 px-8 bg-white sm:px-20 '>
        <div className='flex flex-1 flex-col items-center'>
          <h2 className='text-2xl font-extrabold leading-snug mb-3'>Who is using our app?</h2>
          <p className='text-md text-gray-500 mb-5'>See below which creators joined us recently</p>
          {lastCreators.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <div className='grid grid-cols-1 gap-5 w-full md:grid-cols-2 xl:grid-cols-3'>
              {lastCreators.map((creator) => (
                <CreatorCard key={creator.address} creator={creator} />
              ))}
            </div>
          )}
        </div>
      </div>


    </AuthRedirectWrapper>
  );
};
