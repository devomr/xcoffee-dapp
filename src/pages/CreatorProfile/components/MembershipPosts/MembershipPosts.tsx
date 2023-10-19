import { MemberPost } from 'components/MemberPost';
import { Creator } from 'types/creator.types';
import { Post } from 'types/post.types';
import { Subscription } from 'types/subscription.types';

interface MemberPostsProps {
  posts: Post[];
  creator: Creator;
  subscription: Subscription | null;
}

export const MembershipPosts: React.FC<MemberPostsProps> = ({ posts, creator, subscription }) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center mb-5'>
        <h2 className='text-lg font-bold mb-3'>My recent supporters</h2>
        <p className='text-sm text-gray-500'>
          You want to be here? Then by me some coffee ☕
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 w-full'>
        {posts && posts.length > 0 ? (
          posts.map((item) => (
            <MemberPost key={item.title} title={item.title} description={item.description} image={item.image} isVisible={subscription !== null && subscription.status === 'active_subscription'} />
          ))
        ) : (
          'No available posts for the moment.'
        )}

      </div>
    </div>
  );
};
