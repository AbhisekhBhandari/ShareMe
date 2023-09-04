import {createClient} from '@sanity/client'
import { userQuery } from './utils/data'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2023-07-14',
    useCdn:false,
    token: process.env.REACT_APP_SANITY_TOKEN
})





const bulder = imageUrlBuilder(client);
export const urlForImage = (source) => bulder.image(source);