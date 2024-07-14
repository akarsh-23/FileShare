/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const formData: FormData = data.formData;
  const apiUrl: string = data.apiUrl;
  const id: string = data.id;

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
