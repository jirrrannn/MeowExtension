(() => {
const newTabLoaded = async () =>{
    console.log("in funtion");
    const catExists = document.getElementsByClassName("cats_container")[0];
    
    if (!catExists) {
        // Create Container
        console.log("creating");
        const cats_container = document.createElement("div");
        cats_container.className = 'cats_container';

        cats_container.style.position = 'fixed';
        cats_container.style.bottom = '0';
        cats_container.style.left = '0';
        cats_container.style.width = '100%';
        cats_container.style.height = '150px';
        // cats_container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        cats_container.style.display = 'flex';
        cats_container.style.justifyContent = 'center';
        cats_container.style.alignItems = 'center';
        cats_container.style.zIndex = '9999';
        cats_container.style.pointerEvents = 'none'; // Ensure container doesn't block interactions

        // 2401*189 /8
        const defaultCat = document.createElement('div');
        defaultCat.className = 'cat-image';
        defaultCat.style.width = '150px'; // Width of each frame
        defaultCat.style.height = '94px'; // Height of the sprite
        defaultCat.style.backgroundImage = `url(${chrome.runtime.getURL("assets/cat_walk_sprite.png")})`;
        defaultCat.style.backgroundPosition = '0 0';
        defaultCat.style.backgroundSize = '1200px 94px'; // Size of the entire sprite sheet
        defaultCat.style.position = 'absolute';
        defaultCat.style.pointerEvents = 'auto'; // Allow interaction with the cat image

        let frame = 0;
        const totalFrames = 8; // Total number of frames
        const spriteWidth = 150; // Width of each frame

        // Function to animate the cat
        const animateCat = () => {
            frame = (frame + 1) % totalFrames;
            defaultCat.style.backgroundPosition = `-${frame * spriteWidth}px 0`;
            setTimeout(animateCat, 100); // Adjust the timeout for the animation speed
        };

        // Start the animation
        animateCat();

        cats_container.appendChild(defaultCat);
        document.body.appendChild(cats_container);
        console.log("Cat container added to the body");
    } else {
        console.log("Cat container already exists");
    }
        // defaultCat.title = "Click to bookmark current timestamp";
  
        // youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
        // youtubePlayer = document.getElementsByClassName('video-stream')[0];
  
        // youtubeLeftControls.appendChild(bookmarkBtn);
        // bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
      }

chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
    const { type } = obj;

    if (type === "NEW") {
      console.log("Message received: NEW");
      sendResponse({ message: "Received NEW message" });
      newTabLoaded();

    }

    // Returning true indicates that sendResponse will be called asynchronously
    return true;
  });
  })();
  