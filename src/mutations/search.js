import gql from 'graphql-tag';

const mutation = gql`
  mutation search(
    $q: String!,
    $page: Int!,
    $folder: String!,
    $subfolder: String!,
  ) {
    search(input: {
      q: $q,
      page: $page,
      folder: $folder,
      subfolder: $subfolder,
    }) {
      results {
        id
        dataUrl
        name
        folder
        subfolder
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
  folder,
  subfolder
}) {
  return apollo.mutate({
    mutation,
    variables: {
      q,
      page,
      folder,
      subfolder
    },
  });
}
