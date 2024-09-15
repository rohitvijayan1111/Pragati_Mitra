import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    // Check if the script is already added
    const existingScript = document.getElementById('google-translate-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    }

    // Function to apply custom styles to the Google Translate dropdown
    const applyCustomStyles = () => {
      const translateFrame = document.querySelector('.goog-te-menu-frame');
      if (translateFrame) {
        const frameDocument = translateFrame.contentDocument || translateFrame.contentWindow.document;
        const style = document.createElement('style');
        style.textContent = `
          .goog-te-menu-frame {
            border: 2px solid #333 !important;
          }
          .goog-te-menu2 {
            background-color: #f0f0f0 !important;
          }
        `;
        frameDocument.head.appendChild(style);
      }
    };

    // Function to hide the language dropdown after a language is selected
    const hideLanguageDropdown = () => {
      const selectedLanguage = document.querySelector('.goog-te-menu2-item-selected');
      if (selectedLanguage) {
        const translateElement = document.getElementById('google_translate_element');
        if (translateElement) {
          translateElement.style.display = 'none';  // Hide the dropdown
        }
      }
    };

    // Observe when a language is selected and hide the dropdown
    const observeLanguageChange = () => {
      const translateFrame = document.querySelector('.goog-te-menu-frame');

      if (translateFrame) {
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type === 'childList') {
              hideLanguageDropdown();  // Hide the dropdown once language is selected
            }
          }
        });

        observer.observe(translateFrame, { childList: true, subtree: true });
      }
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = function() {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          multilanguagePage: true,
        },
        'google_translate_element'
      );

      // Wait for the Translate widget to be fully initialized before applying styles
      setTimeout(() => {
        applyCustomStyles();
        observeLanguageChange(); // Start observing changes
      }, 2000);
    };

    // Cleanup function
    return () => {
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return <div id="google_translate_element" style={{ position: 'fixed', top: 0, right: 0 }}></div>;
};

export default GoogleTranslate;
