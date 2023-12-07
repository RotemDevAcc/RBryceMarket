import { useEffect } from 'react';

export function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
    // Toggle button color
    const darkModeButton = document.getElementById("darkModeButton");
    if(darkModeButton){
        if (darkModeButton.classList.contains("btn-secondary")) {
            darkModeButton.classList.replace("btn-secondary", "btn-primary");
            darkModeButton.innerText = "Normal Mode"
        } else {
            darkModeButton.classList.replace("btn-primary", "btn-secondary");
            darkModeButton.innerText = "Dark Mode"
        }
    }
    
    const isDarkMode = body.classList.contains("dark-mode");
    localStorage.setItem("darkmode", isDarkMode)
}

function DarkMode() {
  useEffect(() => {
    // Check if dark mode is enabled in local storage
    const darkmode = localStorage.getItem("darkmode");
    const body = document.body;
    if (darkmode === "true") {
      // Apply dark mode styles
      body.classList.add("dark-mode");

      // You can also update state here if needed
      // Example: setDarkMode(true);
    }else{
        body.classList.remove("dark-mode");
    }

    // Cleanup function to remove dark mode styles when the component is unmounted

  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return (
    null
  );
}

export default DarkMode;
