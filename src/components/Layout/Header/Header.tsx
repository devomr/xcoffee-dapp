import { Button } from 'components/Button';
import { MxLink } from 'components/MxLink';
import { logout } from 'helpers';
import { useGetIsLoggedIn } from 'hooks';
import { RouteNamesEnum } from 'localConstants';

export const Header = () => {
  const isLoggedIn = useGetIsLoggedIn();

  const handleLogout = () => {
    sessionStorage.clear();
    logout(`${window.location.origin}/unlock`, undefined, false);
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
              className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600 hover:bg-slate-100 mx-0'
            >
              Close
            </Button>
          ) : (
            <MxLink to={RouteNamesEnum.unlock}
              className='border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded focus:outline-none hover:bg-blue-100 hover:text-blue-700'>
              Connect Wallet
            </MxLink>
          )}
        </div>
      </nav>
    </header>
  );
};
