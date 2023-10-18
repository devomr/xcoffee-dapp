import { MemberPost } from 'components/MemberPost';
import { useGetAccountInfo } from 'hooks';
import { useUserSubscriptionForCreator } from 'hooks/useUserSubscriptionForCreator';
import { Creator } from 'types/creator.types';

interface MemberPostsProps {
  posts: any[]
  creator: Creator
}

export const MemberPosts: React.FC<MemberPostsProps> = ({ posts, creator }) => {
  const { address } = useGetAccountInfo();
  const { subscription, loading, error } = useUserSubscriptionForCreator(address, creator.address);


  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center mb-5'>
        <h2 className='text-lg font-bold mb-3'>My recent supporters</h2>
        <p className='text-sm text-gray-500'>
          You want to be here? Then by me some coffee ☕
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 w-full'>
        <MemberPost title='Post 1' description='description post' image='../assets.jpg' isVisible={subscription !== null && subscription.status === 'active_subscription'} />
      </div>
    </div>
  );
};
