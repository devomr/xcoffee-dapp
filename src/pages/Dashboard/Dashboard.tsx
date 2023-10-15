import { Button } from 'components';
import { Card } from 'components/Card';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';


export const Dashboard = () => {

  const handleCreateProfileButtonClick = () => {

  }

  return (
    <AuthRedirectWrapper>
      <div className='px-8 mt-5 min-h-screen sm:px-20'>
        <div className='flex flex-1 flex-col rounded bg-white p-6 '>
          <h1 className='text-xl font-extrabold leading-snug mb-3'>
            Create your profile
          </h1>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Fullname
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullname" type="text" placeholder="Enter your fullname" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                Password
              </label>
              <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" rows={10} placeholder='Add some words about you'></textarea>
            </div>
            <div className="flex items-center justify-between">
              <Button
                className='bg-blue-500 text-white font-semibold py-3 px-4 rounded focus:outline-none hover:bg-blue-100 hover:text-blue-700 w-auto'
                onClick={handleCreateProfileButtonClick}>
                Create profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthRedirectWrapper>
  )
};
