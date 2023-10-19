import { CreatorCard } from 'components';
import { findAvailableCreators } from 'services/creators.service';
import { useEffect, useState } from 'react';
import { Creator } from 'types/creator.types';

export const Creators = () => {
  // State for showing the available creators
  const [creators, setCreators] = useState<Creator[]>([]);

  const fetchAvailableCreators = async () => {
    try {
      const response = await findAvailableCreators();

      if (!response) {
        return;
      }

      setCreators(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchAvailableCreators();
  }, []);


  return (
    <div className='flex flex-1 justify-center py-8 px-8 bg-white sm:px-20 '>
      <div className='flex flex-1 flex-col'>
        <div className="flex flex-col items-center mb-5">
          <h2 className='text-2xl font-extrabold leading-snug mb-3'>Looking for a creator?</h2>
          <p className='text-md text-gray-500 mb-5'>You can see below the creators who joined out platform</p>
        </div>

        {creators.length === 0 ? (
          <p>No creators available yet. You can be the first one</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {creators.map((creator) => (
              <CreatorCard key={creator.address} creator={creator} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
