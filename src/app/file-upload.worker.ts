/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const files: { name: string; content: Blob }[] = data.files;
  const apiUrl: string = data.apiUrl;
  const id: string = data.id;

  const formData = new FormData();
  files.forEach(file => {
    formData.append(file.name, file.content, file.name);
  });

  const xhr = new XMLHttpRequest();

  xhr.open('POST', `${apiUrl}/upload/${id}/images`, true);

  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const percentComplete = Math.round((event.loaded / event.total) * 100);
      postMessage({ progress: percentComplete });
    }
  };

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const result = JSON.parse(xhr.responseText);
      postMessage({ success: true, result });
    } else {
      postMessage({ success: false, error: xhr.statusText });
    }
  };

  xhr.onerror = () => {
    postMessage({ success: false, error: xhr.statusText });
  };

  xhr.send(formData);
});
