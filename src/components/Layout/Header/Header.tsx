import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'components/Button';
import { MxLink } from 'components/MxLink';
import { buildRouteWithCallback, logout } from 'helpers';
import { useGetIsLoggedIn } from 'hooks';
import { RouteNamesEnum } from 'localConstants';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  const isLoggedIn = useGetIsLoggedIn();

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
        <div className='text-xl font-bold w-full h-6'>xCoffee</div>
      </MxLink>

      <nav className='h-full w-full text-sm sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent'>
        <div className='flex justify-end container mx-auto items-center gap-2'>

          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              className='flex gap-3 items-center rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600 hover:bg-slate-100 mx-0'
            >
              <FontAwesomeIcon className='text-gray-500' icon={faPowerOff} size='sm' />
              Disconnect
            </Button>
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
