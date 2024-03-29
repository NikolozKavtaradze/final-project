import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption, MDBContainer } from 'mdb-react-ui-kit';

export default function Carousel() {
  return (
    <MDBContainer fluid className='my-5'>
      <MDBCarousel showControls showIndicators dark >
        <MDBCarouselItem itemId={1}>
          <img src='https://www.maxvisionsolutions.com/images/2023/06/21/Untitled%20design%20(53).png' className='d-block w-100' alt='...' />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={2}>
          <img src='https://mlx3lspc9ed5.i.optimole.com/cb:Onk_.355ab/w:auto/h:auto/q:mauto/https://www.bluehost.com/blog/wp-content/uploads/2023/11/is-ecommerce-profitable.png' className='d-block w-100' alt='...' />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={3}>
          <img src='https://images.ctfassets.net/17o2epk8ivh7/7wHqf9ybIGbjncyjpHgDvG/372ad482c437af69f4c6b7c9b6b200ae/social_ecommerce.jpg?h=1215&q=90&w=2160' className='d-block w-100' alt='...' />
        </MDBCarouselItem>
      </MDBCarousel>
    </MDBContainer>
  );
}