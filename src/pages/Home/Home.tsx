import { AuthRedirectWrapper } from 'wrappers';
import { Button } from 'components';
import { Link, useNavigate } from 'react-router-dom';
import { CreatorCard } from './CreatorCard';
import { findCreatorByAddress, findTopSupportedCreators } from 'services/creators.service';
import { useEffect, useState } from 'react';
import { RouteNamesEnum } from 'localConstants';
import { Creator } from 'types/creator.types';
import { buildRouteWithCallback } from 'helpers';

export const Home = () => {
  const navigate = useNavigate();

  // State for showing Top 10 creators orderd by supporters
  const [topSupportedCreators, setTopSupportedCreators] = useState<Creator[]>([]);

  // State for search input
  const [search, setSearch] = useState('');

  const fetchTopSupportedCreators = async () => {
    try {
      const response = await findTopSupportedCreators();

      if (!response) {
        return;
      }

      setTopSupportedCreators(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTopSupportedCreators();
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
    sessionStorage.setItem('xcoffee:redirect', 'create-profile');
    navigate(buildRouteWithCallback(RouteNamesEnum.unlock, RouteNamesEnum.createProfile));
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

      <div className='flex flex-1 items-center justify-center py-8 px-8 bg-blue-50 sm:px-20 '>
        <div className='flex flex-1 flex-col items-center'>
          <h2 className='text-2xl font-extrabold leading-snug mb-3'>Looking for a creator?</h2>
          <p className='text-md text-gray-500 mb-5'>You can search your favorite creator using his wallet address</p>

          <div className='flex flex-row gap-2'>
            <input className="shadow appearance-none border rounded p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="Search by: erd..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button
              className='bg-blue-700 text-white font-semibold py-3 px-4 rounded focus:outline-none hover:bg-blue-100 hover:text-blue-700 w-auto'
              onClick={handleSearchButtonClick}>
              Search creator
            </Button>

          </div>
        </div>
      </div>

      <div className='flex flex-1 items-center justify-center py-8 px-8 bg-white sm:px-20 '>
        <div className='flex flex-1 flex-col items-center'>
          <h2 className='text-2xl font-extrabold leading-snug mb-3'>Who is using our app?</h2>
          <p className='text-md text-gray-500 mb-5'>See bellow what creators are using our app and support your favorites</p>
          <div>
            {topSupportedCreators.length === 0 ? (
              <p>No results found.</p>
            ) : (
              <div className='grid grid-cols-3 gap-10'>
                {topSupportedCreators.map((creator) => (
                  <CreatorCard key={creator.address} creator={creator} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>


    </AuthRedirectWrapper>
  );
};
