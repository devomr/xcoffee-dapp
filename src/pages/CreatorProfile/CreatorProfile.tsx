import { DonationForm } from 'pages/CreatorProfile/components/DonationForm';
import { SetStateAction, useEffect, useState } from 'react';
import { Tab } from 'components/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { findDonationsHistory, getCountOfSupporters } from 'services/transactions.service';
import { findCreatorByAddress } from 'services/creators.service';
import { Link, useParams } from 'react-router-dom';
import { Creator } from 'types/creator.types';
import { DonationTransaction } from 'types/donationTransaction.types';
import { EXPLORER_URL } from 'config';
import { MembershipPlans } from './components/MembershipPlans';
import { RecentSupporters } from './components/RecentSupporters';
import { MembershipPosts } from './components/MembershipPosts';
import { useUserSubscriptionForCreator } from 'hooks/useUserSubscriptionForCreator';
import { Post } from 'types/post.types';
import { getPostsForMembers } from 'services/post.service';
import { Subscription } from 'types/subscription.types';
import { getUserSubscription } from 'services/subscriptions.service';


export const CreatorProfile = () => {
  const { creatorAddress } = useParams();

  const { data } = useUserSubscriptionForCreator(creatorAddress);

  const [currentCreator, setCurrentCreator] = useState<Creator | null>(null);
  const [donationsTransactions, setDonationsTransactions] = useState<DonationTransaction[]>([]);
  const [supportersCount, setSupportersCount] = useState<number>(0);
  const [memberPosts, setMemberPosts] = useState<Post[]>([]);
  const [userSubscription, setUserSubscription] = useState<Subscription | null>(data);
  const [activeTab, setActiveTab] = useState('supporters');

  const changeTab = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const getCreatorAvatarLetters = (creator: Creator) => {
    const firstNameLetter = creator.firstName.length > 0 ? creator.firstName.charAt(0) : '';
    const lastNameLetter = creator.lastName.length > 0 ? creator.lastName.charAt(0) : '';
    return `${firstNameLetter}${lastNameLetter}`;
  };

  const fetchCreatorByAddress = async (address: string) => {
    const creator: Creator = await findCreatorByAddress(address);

    if (!creator) {
      alert('Creator not found');
      return;
    }
    setCurrentCreator(creator);
  };

  const fetchCountOfSupporters = async (address: string) => {
    const response = await getCountOfSupporters(address);
    setSupportersCount(response?.data)
  };

  const fetchDonationsHistory = async (address: string) => {
    const response = await findDonationsHistory(address);
    setDonationsTransactions(response?.data)
  };

  const fetchUserSubscription = async (creatorAddress: string) => {
    const subscription = await getUserSubscription(creatorAddress);
    setUserSubscription(subscription);
  };

  useEffect(() => {
    if (!creatorAddress) {
      alert('Creator address not valid');
      return;
    }

    fetchCreatorByAddress(creatorAddress);
    fetchCountOfSupporters(creatorAddress);
    fetchDonationsHistory(creatorAddress);

    setMemberPosts(getPostsForMembers());

    // Polling interval in milliseconds (e.g., every 5 seconds)
    const pollingInterval = 5000;

    // Set up an interval to periodically fetch data
    const polling = setInterval(() => {
      fetchCountOfSupporters(creatorAddress);
      fetchDonationsHistory(creatorAddress);
      fetchUserSubscription(creatorAddress);
    }, pollingInterval);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => {
      clearInterval(polling);
    };

  }, []);


  if (!currentCreator) {
    return (
      <div className='relative px-8 min-h-screen sm:px-20'>
        Creator was not found
      </div>
    );
  }


  return (
    <div className='relative px-8 min-h-screen sm:px-20'>
      <div className='absolute top-0 left-0 bg-blue-600 w-full h-[300px]'></div>
      <div className='relative flex flex-col gap-6 items-start justify-between mt-10 md:flex-row'>
        <div className='flex flex-col bg-white p-6 rounded-md shadow-md w-full md:w-2/3'>
          <div className='mb-5'>
            <div className='flex justify-between'>
              <div className='flex gap-2 items-center mb-3'>
                <div className="w-14 h-14 flex items-center justify-center bg-blue-500 rounded-full text-white font-bold text-xl">
                  {getCreatorAvatarLetters(currentCreator)}
                </div>
                <h1 className='text-2xl font-extrabold leading-snug'>
                  {currentCreator.firstName} {currentCreator.lastName}
                </h1>
                <Link to={`${EXPLORER_URL}/accounts/${creatorAddress}`} target='_blank'>
                  <FontAwesomeIcon className='text-gray-500 cursor-pointer' icon={faArrowUpRightFromSquare} size='sm' />
                </Link>
              </div>

            </div>
            <div className='flex my-3'>
              <div className='flex gap-2 items-center'>
                <FontAwesomeIcon className='text-gray-500' icon={faHeart} size='sm' />
                <span>{supportersCount} supporter(s)</span>
              </div>
            </div>
            <p className='text-gray-500 mb-5'>
              {currentCreator.description}
            </p>
          </div>

          <div className="w-full mx-auto">
            <div className="flex space-x-4 border-b border-gray-200">
              <Tab
                id='supporters'
                label='Recent supporters 🤝'
                isActive={activeTab === 'supporters'}
                onClick={() => changeTab('supporters')}
              />
              <Tab
                id='membership'
                label='Membership 👥'
                isActive={activeTab === 'membership'}
                onClick={() => changeTab('membership')}
              />
              <Tab
                id='posts'
                label='Posts ✉️'
                isActive={activeTab === 'posts'}
                onClick={() => changeTab('posts')}
              />
            </div>

            <div className="mt-4">
              {activeTab === 'supporters' && (
                <RecentSupporters donationsTransactions={donationsTransactions} />
              )}

              {activeTab === 'posts' && <div>
                <MembershipPosts posts={memberPosts} creator={currentCreator} subscription={userSubscription} />
              </div>}

              {activeTab === 'membership' && <div>
                <MembershipPlans creator={currentCreator} subscription={userSubscription} />
              </div>}
            </div>
          </div>
        </div>

        <div className='flex justify-end w-full md:w-1/3'>
          <DonationForm creator={currentCreator} />
        </div>
      </div>
    </div>
  );
};
