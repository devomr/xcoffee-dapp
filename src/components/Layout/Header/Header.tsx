import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'components/Button';
import { MxLink } from 'components/MxLink';
import { logout } from 'helpers';
import { useGetAccountInfo, useGetIsLoggedIn } from 'hooks';
import { RouteNamesEnum } from 'localConstants';
import { Link, useLocation } from 'react-router-dom';
import { buildRouteWithCallback } from 'utils';
import logo from '../../../assets/img/xcoffee-logo.png'; // Adjust the path as needed
import { useGetCreatorAccountInfo } from 'hooks/useGetCreatorAccountInfo';

export const Header = () => {
  const location = useLocation();
  const isLoggedIn = useGetIsLoggedIn();
  const { address } = useGetAccountInfo();
  const { creator, loading, error } = useGetCreatorAccountInfo(address);


  const handleLogout = () => {
    sessionStorage.clear();
    logout(`${window.location.origin}`, undefined, false);
  };

  return (
    <header className='flex flex-row align-center justify-between py-5 px-6 z-10 bg-white sm:px-20 shadow-md'>
      <MxLink
        className='flex items-center justify-between'
        to={isLoggedIn ? RouteNamesEnum.dashboard : RouteNamesEnum.home}
      >
        <div className='flex items-center gap-2 text-xl font-bold w-full h-6'>
          <img src={logo} alt="Your Image" width={32} />
          xCoffee
        </div>
      </MxLink>

      <nav className='h-full w-full text-sm sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent'>
        <div className='flex justify-end container mx-auto items-center gap-2'>
          <Link to={RouteNamesEnum.creators} className='rounded-lg px-3 py-2 text-center hover:no-underline my-0 hover-bg-slate-100 mx-0'>
            Creators
          </Link>
          {isLoggedIn ? (
            <div className='flex items-center gap-3 text-gray-600'>
              {creator && creator.active ? (
                <>
                  <Link to={'creator/' + address} className='rounded-lg px-3 py-2 text-center hover:no-underline my-0 hover-bg-slate-100 mx-0'>
                    Profile
                  </Link>
                  <Link to={RouteNamesEnum.settings} className='rounded-lg px-3 py-2 text-center hover:no-underline my-0 hover-bg-slate-100 mx-0'>
                    Settings
                  </Link>
                </>
              ) : null}

              <Button
                onClick={handleLogout}
                className='flex gap-2 items-center rounded-lg px-3 py-2 text-center hover:no-underline my-0 hover:bg-slate-100 mx-0'
              >
                <FontAwesomeIcon icon={faPowerOff} size='sm' />
                Disconnect
              </Button>
            </div>
          ) : (
            <MxLink to={buildRouteWithCallback(RouteNamesEnum.unlock, location.pathname)}
              className='border border-blue-700 text-blue-700 font-semibold py-2 px-4 rounded focus:outline-none hover:bg-blue-100 hover:text-blue-700'>
              Connect Wallet
            </MxLink>
          )}
        </div>
      </nav>
    </header>
  );
};
