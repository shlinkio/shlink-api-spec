import React, { FunctionComponent, useEffect, useState } from 'react';
import Head from 'next/head';
import { loadTags, useRouter } from '../helpers';
import LoadingSpec from './LoadingSpec';
import SwaggerContainer from './SwaggerContainer';

const BASE64_FAVICON = 'data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOWWRgAAAAAAAAAAAAAAAADllkYY5ZZGT+WWRjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADllkYA5ZZGC+WWRo3llkbK5ZZG/+WWRv/llkb/5ZZGfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOWWRh/llkb35ZZG/+WWRv/llkb/5ZZG/+WWRv/llkZEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5ZZGCeWWRt/llkb/5ZZG/+WWRv/llkb/5ZZG/+WWRgwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5ZZGAuWWRkLllkY2AAAAAOWWRpvllkbC5ZZG/+WWRv/llkb3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5ZZGMOWWRv/llkb/5ZZG/+WWRv/llkb/5ZZGzgAAAADllkYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOWWRi/llkb/5ZZG/+WWRv/llkb/5ZZG/+WWRv/llkb/5ZZGzgAAAADllkYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5ZZGC+WWRmHllkZu5ZZG/+WWRv/llkb/5ZZG/+WWRv/llkbn5ZZG/+WWRv/llkb/5ZZGzgAAAADllkYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOWWRlLllkb/5ZZG/+WWRv/llkb/5ZZG/+WWRv/llkb/5ZZG0wAAAADllkbj5ZZG/+WWRv/llkb/5ZZGzgAAAADllkYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADllkYX5ZZG/+WWRv/llkb/5ZZG/+WWRv/llkb/5ZZG/+WWRtMAAAAA5ZZGAOWWRlzllkb/5ZZG/+WWRv/llkb/5ZZGmwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOWWRnvllkb/5ZZG/+WWRv/llkb/5ZZG/+WWRv/llkbjAAAAAOWWRgAAAAAAAAAAAOWWRvPllkb/5ZZG/+WWRv/llka1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5ZZGjOWWRv/llkb/5ZZG/+WWRv/llkb/5ZZG/+WWRsUAAAAAAAAAAAAAAAAAAAAA5ZZGbuWWRv/llkb/5ZZG9uWWRhbllkYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOWWRgDllkZL5ZZG/+WWRv/llkb/5ZZG/+WWRv/llkb/5ZZGhgAAAAAAAAAAAAAAAAAAAAAAAAAA5ZZGjOWWRq3llkYV5ZZGAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADllkbH5ZZG/+WWRv/llkb/5ZZG/+WWRvDllkYC5ZZGAAAAAAAAAAAAAAAAAOWWRgAAAAAAAAAAAOWWRgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5ZZGAAAAAADllkZ/5ZZG2+WWRuPllkaa5ZZGB+WWRgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADllkYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////H///8B///+Af///gH///iD///wA///4CP//8cH//+PH///Hx///yI///0if//4Ev/58BP/8OPj/+Bjx//gI4//8BAf//gAP///BH///gP///wB///gAP//wBB//4AwP/+AeD//gHg//4B8P//Af///4P////////8=';

const Home: FunctionComponent = () => {
  const { navigate, query } = useRouter();
  const [ url, setUrl ] = useState('');
  const [ tags, setTags ] = useState([] as string[]);
  const [ error, setError ] = useState(false);
  const navigateToTag = async (tag: string) => navigate(`/?version=${tag}`);

  useEffect(() => {
    loadTags()
      .then((tags: string[]) => setTags(tags))
      .catch(() => setError(true));
  }, []);
  useEffect(() => {
    const { version } = query;
    const versionToLoad = version || tags[0];

    setUrl(`https://raw.githubusercontent.com/shlinkio/shlink/${versionToLoad}/docs/swagger/swagger.json`);
  }, [ query, tags ]);

  return (
    <div>
      <Head>
        <title>Shlink - Open API spec UI</title>
        <meta name="description" content="A self-hosted and PHP-based URL shortener with CLI and REST interfaces" />
        <meta name="theme-color" content="#4696e5" />
        <link rel="icon" type="image/x-icon" href={BASE64_FAVICON} />
      </Head>

      {url === '' ? <LoadingSpec withError={error} /> : <SwaggerContainer url={url} tags={tags} setTag={navigateToTag} />}
    </div>
  );
};

export default Home;
