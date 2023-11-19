import React, { useState } from 'react';

function AudioUploader() {
    const [audioSrc, setAudioSrc] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "audio/mpeg") {
            const url = URL.createObjectURL(file);
            setAudioSrc(url);
        } else {
            console.log("Please select an MP3 file.");
        }
    };

    return (
        <div>
            <input type="file" accept="audio/mpeg" onChange={handleFileChange} />
            {audioSrc && <audio controls src={audioSrc} />}
        </div>
    );
}

export default AudioUploader;


// import React, { useState } from 'react';

// function Audio() {
//     const [audioSrc, setAudioSrc] = useState(null);

//     const handleDragOver = (e) => {
//         e.preventDefault(); // Necessary to allow for a drop event
//     };

//     const handleDrop = (e) => {
//         e.preventDefault();
//         const file = e.dataTransfer.files[0];
//         if (file && file.type === "audio/mpeg") {
//             const url = URL.createObjectURL(file);
//             setAudioSrc(url);
//         } else {
//             console.log("Please drop an MP3 file.");
//         }
//     };

//     return (
//         <div 
//             onDragOver={handleDragOver} 
//             onDrop={handleDrop} 
//             style={{ width: '300px', height: '150px', border: '1px solid black', textAlign: 'center', lineHeight: '150px' }}
//         >
//             Drag and drop your MP3 file here
//             {audioSrc && <audio controls src={audioSrc} />}
//         </div>
//     );
// }

// export default AudioPlayer;
