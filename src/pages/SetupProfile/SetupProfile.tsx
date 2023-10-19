import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { Button } from 'components';
import { useGetCreatorAccountInfo } from 'hooks/useGetCreatorAccountInfo';
import { RouteNamesEnum } from 'localConstants';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProfile } from 'services/creators.service';
import { AddCreator } from 'types/creator.types';
import { AuthRedirectWrapper } from 'wrappers';

export const SetupProfile = () => {
  const navigate = useNavigate();
  const { address } = useGetAccountInfo();
  const { creator } = useGetCreatorAccountInfo(address);

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    description: ''
  });

  if (creator && creator.active) {
    navigate(RouteNamesEnum.dashboard);
  }

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value
    });
  }

  const handleSaveProfile = async (event: React.FormEvent) => {
    event.preventDefault();

    const newCreator: AddCreator = {
      firstName: state.firstName,
      lastName: state.lastName,
      description: state.description,
      address: address,
      active: true
    }

    try {
      await createProfile(newCreator);

      // Refresh the entire page
      window.location.reload();

    } catch (error: any) {
      if (error.message) {
        // TODO: implement a toast message
        console.error(error)
        alert(error.message);
      }
    }
  };


  return (
    <AuthRedirectWrapper requireAuth={true}>
      <div className='px-8 mt-5 min-h-screen sm:px-20'>
        <div className='bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md mb-5' role='alert'>
          <div className='flex items-center gap-3'>
            <span className='font-bold'>Info</span>
            <span className='text-sm'>
              Your profile will be visible after you complete the required details.
            </span>
          </div>
        </div>
        <div className='flex flex-1 flex-col rounded bg-white p-6 '>
          <h1 className='text-xl font-extrabold leading-snug mb-3'>
            Create your profile
          </h1>
          <form>
            <div className='mb-4'>
              <div className='flex  gap-3'>
                <div className='flex-1'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    First name
                  </label>
                  <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' placeholder='Enter your first name'
                    name='firstName' value={state.firstName} onChange={handleFormChange} />
                </div>
                <div className='flex-1'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Last name
                  </label>
                  <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' placeholder='Enter your last name'
                    name='lastName' value={state.lastName} onChange={handleFormChange} />
                </div>
              </div>
            </div>
            <div className='mb-2'>
              <label className='block text-gray-700 text-sm font-bold mb-2' >
                Description
              </label>
              <textarea className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' rows={10} placeholder='Add some words about you'
                name='description' value={state.description} onChange={handleFormChange}></textarea>
            </div>
            <div className='flex items-center justify-between'>
              <Button
                className='bg-blue-500 text-white font-semibold py-3 px-4 rounded focus:outline-none hover:bg-blue-100 hover:text-blue-700 w-auto'
                onClick={handleSaveProfile}>
                Save profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthRedirectWrapper>
  );
};
