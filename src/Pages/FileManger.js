import React, { useState, useEffect } from 'react';
import { storage } from '../firebaseConfig';

function FileManager({ onClose }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch the list of files from Firebase Storage
    const storageRef = storage.ref('/'); // Replace with your storage directory

    storageRef
      .listAll()
      .then(async (result) => {
        const fileArray = [];
        for (const fileRef of result.items) {
          // Get the download URL for each file
          const url = await fileRef.getDownloadURL();
          fileArray.push({
            name: fileRef.name,
            url,
          });
        }
        setFiles(fileArray);
      })
      .catch((error) => {
        console.error('Error fetching files:', error);
      });
  }, []);

  return (
    <div>
      <h2>File Manager</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default FileManager;
