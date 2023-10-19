import { Post } from 'types/post.types';

// Currently mock data here
const MOCK_POSTS: Post[] = [
  {
    image: '../../../public/preview.jpg',
    title: 'My super post',
    description: 'My super post description'
  }
];

export const getPostsForMembers = () => {
  return MOCK_POSTS;
};
