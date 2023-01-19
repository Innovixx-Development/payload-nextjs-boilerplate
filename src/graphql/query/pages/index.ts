import { Page } from '../../../../payload-types';
import { CONTENT, IMAGE } from '../blocks';
import { MEDIA_FIELD } from '../fields';

const PAGE_QUERY = `
  query Pages($slug: String) {
    Pages(where: { slug: { equals: $slug} }) {
      docs {
        id
        slug
        title
        image {
          ${MEDIA_FIELD}
        }
        layout {
          ${CONTENT}
          ${IMAGE}
        }
        meta {
          title
          description
          keywords
        }
      }
    }
  }
`;


export const fetchPage = async (slug?: string): Promise<{page: Page | null}> => {
  const { data, errors } = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 600,
    },
    body: JSON.stringify({
      query: PAGE_QUERY,
      variables: {
        slug,
      },
    }),
  }).then((res) => res.json());

  if (errors) {
    console.error(JSON.stringify(errors));
    throw new Error();
  }

  return {
    page: data.Pages.docs[0],
  };
};
