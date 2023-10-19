import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { Button } from 'components';
import { RouteNamesEnum } from 'localConstants';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findCreatorByAddress, updateProfile } from 'services/creators.service';
import { Creator, UpdateCreator } from 'types/creator.types';
import { AuthRedirectWrapper } from 'wrappers';

export const Settings = () => {
  const navigate = useNavigate();
  const { address } = useGetAccountInfo();

  // state for the update form
  const [updateFormState, setUpdateFormState] = useState({
    firstName: '',
    lastName: '',
    description: ''
  });

  /**
   * Handle form input change events
   * @param event Input or textarea event
   */
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setUpdateFormState({
      ...updateFormState,
      [name]: value
    });
  }

  /**
   * Fetch creator off-chain details based on his wallet address.
   * @param address Wallet address
   * @returns 
   */
  const fetchCreatorByAddress = async (address: string) => {
    const creator: Creator = await findCreatorByAddress(address);

    if (!creator) {
      navigate(RouteNamesEnum.home);
      return;
    }

    // set the creator
    setUpdateFormState({
      ...updateFormState,
      firstName: creator.firstName,
      lastName: creator.lastName,
      description: creator.description
    });
  };

  /**
   * Update creator profile details
   * @param event Submit form event
   */
  const handleUpdateProfile = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedCreator: UpdateCreator = {
      firstName: updateFormState.firstName,
      lastName: updateFormState.lastName,
      description: updateFormState.description,
      address: address
    }

    try {
      await updateProfile(updatedCreator);
      alert('Your profile was updated!');
    } catch (error) {
      alert(`Error while updating your profile: ${error}`);
    }
  }

  useEffect(() => {
    // get details of the current creator from off-chain
    fetchCreatorByAddress(address);

  }, []);

  return (
    <AuthRedirectWrapper requireAuth={true}>
      <div className='px-8 mt-5 min-h-screen sm:px-20'>
        <div className='flex flex-1 flex-col rounded bg-white p-6 '>
          <h1 className='text-xl font-extrabold leading-snug mb-3'>
            Settings
          </h1>

          <div className='flex flex-col p-6 rounded-lg shadow-md'>
            <h2 className='text-md font-extrabold leading-snug mb-3'>
              Update profile details
            </h2>
            <form>
              <div className="mb-4">
                <div className='flex  gap-3'>
                  <div className='flex-1'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      First name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter your first name"
                      name="firstName" value={updateFormState.firstName} onChange={handleFormChange} />
                  </div>
                  <div className='flex-1'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Last name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter your last name"
                      name="lastName" value={updateFormState.lastName} onChange={handleFormChange} />
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                  Description
                </label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" rows={10} placeholder='Add some words about you'
                  name="description" value={updateFormState.description} onChange={handleFormChange}></textarea>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  className='bg-blue-500 text-white font-semibold py-3 px-4 rounded focus:outline-none hover:bg-blue-100 hover:text-blue-700 w-auto'
                  onClick={handleUpdateProfile}>
                  Update profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthRedirectWrapper>
  );
};
