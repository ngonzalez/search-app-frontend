import gql from 'graphql-tag';

const mutation = gql`
  mutation showItem(
    $id: String!,
  ) {
    showItem(input: {
      id: $id,
    }) {
      folder {
        id
        dataUrl
        name
        parentFolder
        parentSubfolder
      }
      audioFiles {
        id
        itemId
        dataUrl
        name
      }
      images {
        id
        fileUrl
        thumbUrl
      }
      loading
      errors
    }
  }
`;

export default function({
  apollo,
  id,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      id,
    },
  });
}
