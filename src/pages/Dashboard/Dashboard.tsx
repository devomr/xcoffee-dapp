import { faMoneyCheck, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import BarChart from 'components/BarChart/BarChart';
import { StatsWidget } from 'components/StatsWidget';
import { useGetAccountInfo } from 'hooks';
import { useGetCreatorAccountInfo } from 'hooks/useGetCreatorAccountInfo';
import { RouteNamesEnum } from 'localConstants';
import { useNavigate } from 'react-router-dom';
import { AuthRedirectWrapper } from 'wrappers';


export const Dashboard = () => {
  const navigate = useNavigate();
  const { address } = useGetAccountInfo();
  const { creator, loading, error } = useGetCreatorAccountInfo(address);

  const data = [
    { timestamp: '2023-01-01', count: 10 },
    { timestamp: '2023-01-02', count: 15 },
    { timestamp: '2023-01-03', count: 8 },
    // Add more data points here
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!creator || !creator.active) {
    // If the creator is not active, he did not setup his profile
    // Redirect to the setup profile page
    navigate(RouteNamesEnum.setupProfile);
    return null;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <AuthRedirectWrapper requireAuth={true}>
      <div className='px-8 mt-5 min-h-screen sm:px-20'>
        <div className='flex flex-1 flex-col rounded bg-white p-6 '>
          <h1 className='text-xl font-extrabold leading-snug mb-5'>
            Welcome, {creator?.firstName} {creator?.lastName}!
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
