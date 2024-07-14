/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const files: { name: string; content: Blob }[] = data.files;
  const apiUrl: string = data.apiUrl;
  const id: string = data.id;

  // Reconstruct FormData
  const formData = new FormData();
  files.forEach(file => {
    formData.append(file.name, file.content, file.name);
  });

  fetch(`${apiUrl}/upload/${id}/images`, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(result => {
      postMessage({ success: true, result });
    })
    .catch(error => {
      postMessage({ success: false, error });
    });
});
