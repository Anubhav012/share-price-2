// const fs = require('fs');

// // Read the contents of the file
// fs.readFile('data.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }

//     // Split the file contents into lines
//     const lines = data.split('\n');

//     // Create an empty object to store key-value pairs
//     const keyValuePairs = {};

//     // Iterate through each line
//     lines.forEach(line => {
//         // Split each line into key and value using the delimiter "-"
//         const parts = line.split('-');

//         // Check if the line is in the correct format
//         if (parts.length === 2) {
//             const key = parts[1].trim();
//             const value = parts[0].trim();
//             // Add key-value pair to the object
//             keyValuePairs[key] = value;
//         } else {
//             console.warn('Invalid line format:', line);
//         }
//     });

//     // Print the resulting key-value pairs object
//     console.log(keyValuePairs);
// });
