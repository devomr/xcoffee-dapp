import { faMoneyCheck, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { AmountWidget } from 'components/AmountWidget';
import BarChart from 'components/BarChart/BarChart';
import { StatsWidget } from 'components/StatsWidget';
import { useGetAccountInfo } from 'hooks';
import { useGetCreatorAccountInfo } from 'hooks/useGetCreatorAccountInfo';
import { RouteNamesEnum } from 'localConstants';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findDonationsHistory, getCountOfSupporters } from 'services/transactions.service';
import { ChartData } from 'types/chart-data.types';
import { DonationTransaction } from 'types/donationTransaction.types';
import { getDateFromTimestampString } from 'utils/date.utils';
import { toEgldAmount } from 'utils/egld.utils';
import { AuthRedirectWrapper } from 'wrappers';


export const Dashboard = () => {
  const navigate = useNavigate();
  const { address } = useGetAccountInfo();
  const { data, loading, error } = useGetCreatorAccountInfo(address);
  const [supportersCount, setSupportersCount] = useState<number>(0);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [chartTransactions, setChartTransactions] = useState<ChartData[]>([]);

  useEffect(() => {
    if (address) {
      fetchCountOfSupporters(address);
      fetchDonationsHistory(address);
    }
  }, [address]);


  const fetchCountOfSupporters = async (address: string) => {
    const response = await getCountOfSupporters(address);
    setSupportersCount(response?.data);
  };

  const fetchDonationsHistory = async (address: string) => {
    const response = await findDonationsHistory(address);
    const donationTransactions: DonationTransaction[] = response?.data || [];

    // calculate total amount of EGLD received
    const amount = donationTransactions.reduce((total, item) => {
      if (item.amount !== undefined) {
        return total + parseFloat(item.amount);
      }
      return total;
    }, 0);
    setDonationAmount(amount);

    // prepare the data for the bar chart
    const donationsMap = new Map<string, number>();
    const chartData: ChartData[] = [];
    donationTransactions.forEach(transaction => {
      const mapKey = getDateFromTimestampString(transaction.createdAt);
      if (donationsMap.has(mapKey)) {
        const existingValue = donationsMap.get(mapKey) || 0;
        donationsMap.set(mapKey, existingValue + parseFloat(transaction.amount));
      } else {
        donationsMap.set(mapKey, parseFloat(transaction.amount));
      }
    });

    for (let [date, amount] of donationsMap) {
      chartData.push({
        label: date,
        value: toEgldAmount(amount)
      });
    }
    setChartTransactions(chartData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.active) {
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
            Welcome back, {data?.firstName} {data?.lastName}!
          </h1>
          <div className='flex gap-5 mb-10'>
            <StatsWidget title={'Supporters'} count={supportersCount} icon={faPeopleGroup}></StatsWidget>
            <AmountWidget title={'EGLD'} amount={donationAmount.toString()} icon={faMoneyCheck}></AmountWidget>
          </div>

          <div className='text-lg font-extrabold leading-snug mb-5'>
            How fans supported you over time
          </div>
          <div className='p-8 shadow-md rounded-lg'>
            <h2 className='text-md font-bold mb-5'>Donations history</h2>
            <div>
              <BarChart data={chartTransactions} />
            </div>
          </div>
        </div>
      </div>
    </AuthRedirectWrapper>
  )
};
