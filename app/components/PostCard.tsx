import { IPost } from '~/interfaces/post';

export default function PostCard({ title, apiURL }: IPost) {
  return (
    <a
      href={apiURL}
      className="bg-secondary flex flex-col gap-2 p-10 transition group-hover:opacity-50 hover:scale-110 hover:opacity-100"
    >
      {title}
    </a>
  );
}
