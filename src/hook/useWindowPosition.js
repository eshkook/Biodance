import { useLayoutEffect, useState } from 'react';

export default function useWindowPosition(id) {
  // State to store whether the animation should be triggered
  const [animation, setAnimation] = useState(false);

  useLayoutEffect(() => {
    // Function to update the animation state based on scroll position
    function updatePosition() {
      // Attempt to find the element by ID
      const element = window.document.getElementById(id);

      // Check if the element exists to avoid errors
      if (element) {
        // Calculate if the page has been scrolled past 70% of the element's height
        const offetSetHeight = element.offsetHeight;
        if (window.scrollY > offetSetHeight * 0.7) {
          setAnimation(true); // Trigger the animation
        } else {
          setAnimation(false); // Reset the animation if scrolled back up
        }
      }
    }

    // Add the scroll event listener to the window
    window.addEventListener('scroll', updatePosition);

    // Initial check in case the page is already scrolled past the trigger point
    updatePosition();

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('scroll', updatePosition);
  }, [id]); // Dependency array with 'id' to re-run the effect if 'id' changes

  // Return the animation state
  return animation;
}
