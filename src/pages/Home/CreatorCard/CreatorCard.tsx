import { Creator } from 'types/creator.types';
import { Button } from 'components';
import { useNavigate } from 'react-router-dom';

interface CreatorCardProps {
  creator: Creator;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  const navigate = useNavigate();

  const getCreatorAvatarLetters = (creator: Creator) => {
    const firstNameLetter = creator.firstName.length > 0 ? creator.firstName.charAt(0) : '';
    const lastNameLetter = creator.lastName.length > 0 ? creator.lastName.charAt(0) : '';
    return `${firstNameLetter}${lastNameLetter}`;
  };

  const handleViewButtonClick = (address: string) => {
    navigate(`/creator/${address}`)
  };

  return (
    <div className='flex flex-col bg-white shadow-md p-6 rounded-md'>
      <div className='flex gap-2 items-center mb-3'>
        <div className="w-14 h-14 flex items-center justify-center bg-blue-500 rounded-full text-white font-bold text-md">
          {getCreatorAvatarLetters(creator)}
        </div>
        <div className='flex flex-col'>
          <h1 className='text-xl font-extrabold leading-snug'>
            {creator.firstName} {creator.lastName}
          </h1>
        </div>
      </div>
      <div className='mb-3'>
        {creator.description}
      </div>
      <div>
        <Button
          className='bg-blue-700 text-white font-semibold p-3 rounded w-full focus:outline-none hover:bg-blue-100 hover:text-blue-700'
          onClick={() => handleViewButtonClick(creator.address)}>
          View creator page
        </Button>
      </div>
    </div >

  );
};

