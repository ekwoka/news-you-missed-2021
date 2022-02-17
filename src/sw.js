import { getFiles, setupPrecaching, setupRouting } from 'preact-cli/sw/';
import { PRERENDER_DATA_FILE_NAME } from './plugins/preact/prerender-data-provider/constants';

setupRouting();

const urlsToCache = getFiles();

urlsToCache.push({ url: `/articles/${PRERENDER_DATA_FILE_NAME}` });

setupPrecaching(urlsToCache);
