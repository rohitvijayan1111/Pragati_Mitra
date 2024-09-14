import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const existingScript = document.getElementById('google-translate-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    }

    const observeLanguageChange = () => {
      const translateFrame = document.querySelector('.goog-te-menu-frame');

      if (translateFrame) {
        // Create an observer to detect changes in the menu frame
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type === 'childList') {
              const selectedLanguage = document.querySelector('.goog-te-menu2-item-selected');
              if (selectedLanguage) {
                document.body.classList.add('translate-active');
              } else {
                document.body.classList.remove('translate-active');
              }
            }
          }
        });

        observer.observe(translateFrame, { childList: true, subtree: true });
      }
    };

    window.googleTranslateElementInit = function() {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          multilanguagePage: true,
        },
        'google_translate_element'
      );

      // Wait for the Translate widget to be fully initialized before observing
      setTimeout(observeLanguageChange, 1000);
    };

    return () => {
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      document.body.classList.remove('translate-active');
    };
  }, []);

  return <div id="google_translate_element" style={{ position: 'fixed', top: 0, right: 0 }}></div>;
};

export default GoogleTranslate;
