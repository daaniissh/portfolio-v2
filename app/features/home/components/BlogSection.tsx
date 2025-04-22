import { IPost } from '~/interfaces/post';
import { Nullable } from '~/types/generics';
import PostCard from './PostCard';

interface Props {
  blogApiURL: Nullable<string>;
  posts: IPost[];
}

export default function BlogSection({ blogApiURL, posts }: Props) {
  return (
    <section id="blog" className="group relative grid gap-2 lg:grid-cols-2">
      <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase md:hidden">blog</span>
      <a
        href="https://moonlitgrace.space"
        target="_blank"
        className="text-foreground text-[0.75em] font-bold tracking-widest uppercase lg:absolute lg:top-5 lg:left-1/2 lg:ml-1"
        rel="noreferrer"
      >
        {blogApiURL}
      </a>
      {posts.map((post, idx) => (
        <PostCard key={idx} translateDown={idx % 2 !== 0} {...post} />
      ))}
    </section>
  );
}
