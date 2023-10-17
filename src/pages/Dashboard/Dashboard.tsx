import { faMoneyCheck, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import BarChart from 'components/BarChart/BarChart';
import { StatsWidget } from 'components/StatsWidget';
import { useGetAccountInfo } from 'hooks';
import { RouteNamesEnum } from 'localConstants';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findCreatorByAddress } from 'services/creators.service';
import { Creator } from 'types/creator.types';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';


export const Dashboard = () => {
  const navigate = useNavigate();
  const { address } = useGetAccountInfo();

  // state for current logged in creator
  const [currentCreator, setCurrentCreator] = useState<Creator | null>(null);
  console.log(address)


  const fetchCreatorByAddress = async (address: string) => {
    const response = await findCreatorByAddress(address);

    if (!response) {
      navigate(RouteNamesEnum.home);
      return;
    }

    // set the creator
    setCurrentCreator(response.data);
  };

  useEffect(() => {
    // get details of the current creator from off-chain
    fetchCreatorByAddress(address);

    const redirect = sessionStorage.getItem('xcoffee:redirect');

    if (redirect == 'create-profile') {
      navigate(RouteNamesEnum.createProfile);
    }

  }, []);

  const data = [
    { timestamp: '2023-01-01', count: 10 },
    { timestamp: '2023-01-02', count: 15 },
    { timestamp: '2023-01-03', count: 8 },
    // Add more data points here
  ];

  return (
    <AuthRedirectWrapper>
      <div className='px-8 mt-5 min-h-screen sm:px-20'>
        <div className='flex flex-1 flex-col rounded bg-white p-6 '>
          <h1 className='text-xl font-extrabold leading-snug mb-5'>
            Welcome, {currentCreator?.firstName} {currentCreator?.lastName}!
          </h1>
          <div className='flex gap-5 mb-10'>
            <StatsWidget title={'Supporters'} count={5} icon={faPeopleGroup}></StatsWidget>
            <StatsWidget title={'EGLD'} count={1.5} icon={faMoneyCheck}></StatsWidget>
          </div>

          <div className='p-8 shadow-lg rounded-lg'>
            <h2 className='text-lg font-bold mb-5'>How your fans supported you over time</h2>
            <div>
              <BarChart data={data} />
            </div>
          </div>
        </div>
      </div>
    </AuthRedirectWrapper>
  )
};
