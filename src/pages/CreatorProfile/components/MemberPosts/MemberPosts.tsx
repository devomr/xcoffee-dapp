import { MemberPost } from 'components/MemberPost';

interface MemberPostsProps {
  posts: any[]
}

export const MemberPosts: React.FC<MemberPostsProps> = ({ posts }) => {

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center mb-5'>
        <h2 className='text-lg font-bold mb-3'>My recent supporters</h2>
        <p className='text-sm text-gray-500'>
          You want to be here? Then by me some coffee ☕
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 w-full'>
        <MemberPost title='Post 1' description='description post' image='../assets.jpg' />
      </div>
    </div>
  );
};
