import { Button } from 'components';
import { Card } from 'components/Card';
import { RouteNamesEnum } from 'localConstants';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';


export const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.getItem('xcoffee:redirect');

    if (redirect == 'create-profile') {
      navigate(RouteNamesEnum.createProfile);
    }

  }, []);

  return (
    <AuthRedirectWrapper>
      <div className='px-8 mt-5 min-h-screen sm:px-20'>
        <div className='flex flex-1 flex-col rounded bg-white p-6 '>
          <h1 className='text-xl font-extrabold leading-snug mb-3'>
            Welcome to Dashboard
          </h1>

        </div>
      </div>
    </AuthRedirectWrapper>
  )
};
