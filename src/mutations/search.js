import gql from 'graphql-tag';

const mutation = gql`
  mutation search(
    $q: String!,
    $page: Int!,
  ) {
    search(input: {
      q: $q,
      page: $page,
    }) {
      results {
        id
        dataUrl
        name
      }
      loading
      errors
      currentPage
      totalPages
    }
  }
`;

export default function({
  apollo,
  q,
  page,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      q,
      page,
    },
  });
}
