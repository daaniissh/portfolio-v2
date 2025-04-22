import { useEffect, useState } from 'react';
import { Nullable } from '~/types/generics';
import { getPublicEnv } from '~/utils/env';

export default function useBlogAPIURL() {
  const [blogApiURL, setBlogApiURL] = useState<Nullable<string>>(null);

  useEffect(() => {
    const _url = getPublicEnv('BLOG_API_URL');
    if (_url) {
      const newUrl = new URL(_url);
      setBlogApiURL(newUrl.hostname);
    }
  }, []);

  return blogApiURL;
}
