import { DonationForm } from 'components/Creator/DonationForm';
import { DonationItem } from 'components/Creator/DonationItem/DonationItem';
import { SetStateAction, useState } from 'react';
import { Tab } from 'components/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { transactions } from 'services/transactions.service';
import { creators } from 'services/creators.service';
import { useParams } from 'react-router-dom';
import { Creator } from 'types/creator.types';


export const CreatorProfile = () => {
  const { creatorAddress } = useParams();

  const [activeTab, setActiveTab] = useState('supporters');

  const changeTab = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleCopyButtonClick = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  const handleShareButtonClick = () => {
    navigator.clipboard.writeText(window.location.href);
  }

  const getCreatorAvatarLetters = (creator: Creator) => {
    const firstNameLetter = creator.firstName.length > 0 ? creator.firstName.charAt(0) : '';
    const lastNameLetter = creator.lastName.length > 0 ? creator.lastName.charAt(0) : '';
    return `${firstNameLetter}${lastNameLetter}`;
  };

  const currentCreator = creators.find(creator => creator.address === creatorAddress);

  if (!currentCreator) {
    return (
      <div className='relative px-8 min-h-screen sm:px-20'>
        Creator was not found
      </div>
    );
  }

  const creatorTransactions = transactions.filter(transaction => transaction.receiverAddress === currentCreator.address);

  return (
    <div className='relative px-8 min-h-screen sm:px-20'>
      <div className='absolute top-0 left-0 bg-blue-600 w-full h-1/3'></div>
      <div className='relative flex flex-1 gap-6 items-start justify-between mt-10 sm:flex-row'>
        <div className='flex flex-col bg-white p-6 rounded-md shadow-md sm:w-2/3'>
          <div className='mb-5'>
            <div className='flex justify-between'>
              <div className='flex gap-2 items-center mb-3'>
                <div className="w-14 h-14 flex items-center justify-center bg-blue-500 rounded-full text-white font-bold text-xl">
                  {getCreatorAvatarLetters(currentCreator)}
                </div>
                <h1 className='text-2xl font-extrabold leading-snug'>
                  {currentCreator.firstName} {currentCreator.lastName}
                </h1>
                <div className="group relative">
                  <FontAwesomeIcon className='text-gray-500 cursor-pointer' icon={faCopy} size='sm' onClick={() => handleCopyButtonClick(currentCreator.address)} />
                  <div className="hidden group-hover:block group-hover:no-underline absolute bg-gray-800 text-white text-xs py-1 px-2 rounded top-8 left-1/2 transform -translate-x-1/2">
                    Copy address
                  </div>
                </div>
              </div>
              <div>
                <button className="bg-blue-400 hover:bg-blue-700 text-white w-10 h-10 rounded-full">
                  <FontAwesomeIcon icon={faShare} size='sm' onClick={handleShareButtonClick} />
                </button>
              </div>
            </div>
            <div className='flex my-3'>
              <div className='flex gap-2 items-center'>
                <FontAwesomeIcon className='text-gray-500' icon={faHeart} size='sm' />
                <span>{currentCreator.supporters} supporters</span>
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
                  {creatorTransactions && creatorTransactions.length > 0 ? (
                    creatorTransactions.map((item) => (
                      <DonationItem key={item.id} donationTransaction={item} />
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

        <div className='flex justify-end sm:w-1/3'>
          <DonationForm creator={currentCreator} />
        </div>
      </div>
    </div>
  );
};
