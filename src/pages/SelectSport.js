import React from 'react';
import { Link } from "react-router-dom"


export default function SelectSport({ onSelectSport }) {
    // Create a new Image object
var icon = new Image();

// Set the image source
icon.src = '../sports/americanfootball.png';


 const handleSportSelection = (sport) => {
    onSelectSport(sport);
  };

  return (
<>
    <div className="headerSection">
        <h1>Pick A Sport</h1>
        <p>Choose a sport so we can recommend you with the <span>best events</span></p>
    </div>

          <div className="sportsGrid">
              <Link to="/home/americanfootball"
                  onClick={() => handleSportSelection('americanfootball')}
                  className="sportItem"
              >
                <img className="sportIcon" src='https://s3-alpha-sig.figma.com/img/15e4/5d15/490cbdc4bf0c65f847f3ee613ea17c56?Expires=1698019200&Signature=oPLnJWN4OI3Vk4Ad3GJC7VJ6K0N3hoO6dPGdLn1rzV5vGb0zKCVKaciq6sV1xHIa8wbumpevTOva4GQDh-NMG3pwGpKdkI2uyLAyJSW1yH8ufWgjpYE~0C9j-c-IdBxhElHsf8pQF38BTKAhfJyBaH29jAaH~~kLTDuBfKUcQrYr6w1B96ZcxHJlD6RKvix-OgVy9NEhGhBjLqqVzKwIzmZYjYOfeAnOn6oH97v5UlwgQ8eda0QfSYZrJbDAyQHGVWEhE66gPMCPK85DHAZ4L4oy~LlG5lY0Bbz-GzOnEjC8yVboC1LPS7WLvXUIzwZ6h4C1Dv-bVBVlC2ewcMiWpA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'></img>
                <p className="sportName">American Football</p>
              </Link>
              
                <Link to="/home/soccer"
                  onClick={() => handleSportSelection('soccer')}
                  className="sportItem"
              >
                <img className="sportIcon" src="https://s3-alpha-sig.figma.com/img/96d7/e1d7/881777c38d7e6d11f01afc44b3bfb2d6?Expires=1698019200&Signature=SHNgFJybaHimZzdAoxQ3wyCRV5HceVLq2uipiuxqmYtMLoI62NkcJOIpux2FWhqiOnrZ26hOyl6ww0w6c~kYUvcWHtl4CkphAyumGgP-ZFeOekB8IGNKnHy2eGF3nBTmWcPWIiS45sRBse26MrFTHk9hNWO~91jCD4eb9XsD7j7IQaEkldFnzUZvK2nG91LhXbFjPWgFlmDaPx748bq5wDY19ima0e6Wl3Jzi9sH~ArY4nhsSiwaQrEBIeP6HbTh6ybeFuEKsZrk3HY6L~LQ~EuHCT6LDeaPHZ0i7Yvoq9g58yZQWjsARdhdgqmvMgWqgjtYhRTpyzN3CHxL~Mddmg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"></img>
                <p className="sportName">Soccer</p>
              </Link>
              

                            <Link to="/home/basketball"
                  onClick={() => handleSportSelection('basketball')}
                  className="sportItem"
              >
                <img className="sportIcon" src='https://s3-alpha-sig.figma.com/img/a468/03fa/bfc97a3c36318a7c83b3455ddcaf33f1?Expires=1698019200&Signature=GxFB3FiCYr2oCyulGxrMUdPoOKnh0gzSbMz5-xXoWOO2wnQXwDc2uOkR1JnnfxE58i04aVP9Hdv67jTt5L18uXRRSHOT5lb18XbM005YeVbSRPC5ChlEPViaRsdT~ZIGqwBeb~~pTKvXVswrHT7z7XjkxrYfAhUYKIvU8TlxuCXZ3sLJI5CFwmK7--rN3vAJLO05kw~VBNdO5MDb4B~ZJ-G4dYJEYWsv4srlq~-g2r-36LeYt2Lr3oaKtp7NYbJ9mgfZ1frjtpfWSZBlmWjC-j3r2CH1Zxp77WlRRxbfqbwcuPu4I3So1HhoHVSObW8j5fSNxLn~QFUBeOhn3S8hDA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'></img>
                <p className="sportName">Basketball</p>
              </Link>
              
              
                            <Link to="/home/baseball"
                  onClick={() => handleSportSelection('baseball')}
                  className="sportItem"
              >
                <img className="sportIcon" src='https://s3-alpha-sig.figma.com/img/80a4/6f02/cfbcf8edd74e3aa326e80669c17ee8f2?Expires=1698019200&Signature=MSrxpaDiH-Nz9zMfyE3ZLPXbQRPYdQtTI3UQIhy~rxIlQP1N93jakHGQQDmWHHwae8RMN4I7OXaJnxS4N7PKsJRgvRssMZcP6a937qlMeXzMYE4M-Q0QTVktCHa13jRueeLCu8TJWOKi6inGrnZRVGZZE2ajGMNzDeD9ozZ6rAP6JYmvc43qWoMmAdUdtw8NvshZoLHrWVA2pL78rdhC9aRkCs5XI5o7MkGFymocflWphGeAyw4K62ifjpGHs2mnfVF9T2SOq58I2r0C3gZY838FvcM1gi~oYRkulP6DY0YtFbWQtY2JNRJVjkm71Qqwm~HwWVST12OKMgC9XWRTqQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'></img>
                <p className="sportName">Basketball</p>
              </Link>
              
              
                            <Link to="/home/combat"
                  onClick={() => handleSportSelection('combat')}
                  className="sportItem"
              >
                <img className="sportIcon" src='https://s3-alpha-sig.figma.com/img/6985/4609/ac109f85850d39152088242db449c6b0?Expires=1698019200&Signature=QE3ZE2UBJcEuzAQgy3aeo637p6ratIEPKi0IRrMHOVVGDnBKY0hFjPYPqe8dncLo9XRJ4PYjvLqcpuf~guNNfc6d4AYqe0J~~8AR7oG9xxxZJ-DAp9ucLAuQc2xJCilAbi-mytQPMVn8AbCWcNsvLEssPP~H~9CBtpNyZqt1PmxkOGjtJTizWRxZOxbXi~3tjuO3f2AWrdwxmXUKInTryBKgCYEsP-B~adXj8RFJUHOHmsYsu8IQojsW9huJSGfSvCD7qfkVHFX2GKiANslcjfzxlXIyvcrOoCWXMuwRBCgoy3MxJrA2GcDkYXFelsrRlv2sOVnUVTIby6vmxmb18w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'></img>
                <p className="sportName">Combat Sports</p>
              </Link>
              
              
                            <Link to="/home/esports"
                  onClick={() => handleSportSelection('esports')}
                  className="sportItem"
              >
                <img className="sportIcon" src='https://s3-alpha-sig.figma.com/img/46c7/531e/4886b7b49890d99d64d86e9ce62c198a?Expires=1698019200&Signature=fz4fnrUZUSCOspM7md4SdDzuZ3Zq80GrGXOCSRn1CqUqH8vaj4J0H6M0TQCAMsMGf3hvWvZk2iZ9RduKPNZ4Wli6lp0H5WBpB~AtljVE6wW3fc9PdRDsNjOEM1RNTuWFIM6JjAwK9Bh6DWpvd-0Z8~X0V-uBcDZzkzAss9VKrUgex7XgOBuWmctPhQ9aOnLM8A4mlc5lIHoA4swWdsWfdKykoTtBG-l01sT7TPcBSgcMFInrcGPKocUOUH1kY2K6Bp-EuzgN8F-Nt8WJoG-5rO-sP5egnavccUB~iSPFwtTDYII9MRujFIoT5h3tu5ncZsyiSyXPGPy5GVmpooY-nA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
></img>
                <p className="sportName">Esports</p>
             </Link>

        {/* <div onClick={() => onSelectSport('soccer')} className="sportItem">
            <img className="sportIcon" src="./public/img/sports/soccer.png" alt="Soccer"></img>
            <p className="sportName">Soccer</p>
        </div>

        <div onClick={() => onSelectSport('combat')} className="sportItem">
            <img className="sportIcon" src="./public/img/sports/combatsports.png" alt="Combat Sports"></img>
            <p className="sportName">Combat Sports</p>
        </div>

        <div onClick= {() => onSelectSport('baseball')} className="sportItem">
            <img className="sportIcon" src="./public/img/sports/baseball.png" alt="Baseball"></img>
            <p className="sportName">Baseball</p>
        </div>

        <div onClick= {() => onSelectSport('basketball')}className="sportItem">
            <img className="sportIcon" src="./public/img/sports/basketball.png" alt="Basketball"></img>
            <p className="sportName">Basketball</p>
        </div>

        <div onClick= {() => onSelectSport('esports')} className="sportItem">
            <img className="sportIcon" src="./public/img/sports/esports.png" alt="Esports"></img>
            <p className="sportName">Esports</p>
        </div> */}
    </div>

</>



// dynamically create each card 
// get all the names from the league endpoint 
// loop through that to create the cards matching the icons with the name in array 
// get the name from the array and format it it so thats theres space inbetween and capitalised 

 
  );
}