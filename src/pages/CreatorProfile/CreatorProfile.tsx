import { DonationForm } from 'components/Creator/DonationForm';
import { DonationItem } from 'components/Creator/DonationItem/DonationItem';
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


export const CreatorProfile = () => {
  const { creatorAddress } = useParams();
  const [currentCreator, setCurrentCreator] = useState<Creator | null>(null);
  const [donationsTransactions, setDonationsTransactions] = useState<DonationTransaction[]>([]);
  const [supportersCount, setSupportersCount] = useState<number>(0);
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
    const response = await findCreatorByAddress(address);

    if (!response) {
      alert('Creator not found');
      return;
    }

    const creator: Creator = response.data;
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

  useEffect(() => {
    if (creatorAddress) {
      fetchCreatorByAddress(creatorAddress);
      fetchCountOfSupporters(creatorAddress);
      fetchDonationsHistory(creatorAddress);
    }
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
      <div className='absolute top-0 left-0 bg-blue-600 w-full h-1/3'></div>
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
                <Link to={EXPLORER_URL + '/accounts/' + creatorAddress} target='_blank'>
                  <FontAwesomeIcon className='text-gray-500 cursor-pointer' icon={faArrowUpRightFromSquare} size='sm' />
                </Link>
              </div>

            </div>
            <div className='flex my-3'>
              <div className='flex gap-2 items-center'>
                <FontAwesomeIcon className='text-gray-500' icon={faHeart} size='sm' />
                <span>{supportersCount} supporters</span>
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
                <div>
                  {donationsTransactions && donationsTransactions.length > 0 ? (
                    donationsTransactions.map((item) => (
                      <DonationItem key={item.txHash} donationTransaction={item} />
                    ))
                  ) : (
                    'No transactions available'
                  )}
                </div>
              )}

              {activeTab === 'posts' && <div>
                Comming soon!
              </div>}
              {activeTab === 'membership' && <div>
                Comming soon!
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
