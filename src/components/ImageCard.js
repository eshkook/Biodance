import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';

// StyledCard applies custom styles to the Card component
const StyledCard = styled(Card)({
  maxWidth: 645,
  background: 'rgba(0,0,0,0.5)',
  margin: '20px',
  minHeight: '500px', // Ensures a consistent height for all cards
});

// StyledCardMedia for custom styling of the CardMedia component
const StyledCardMedia = styled(CardMedia)({
    height: 440, // Sets a fixed height for the image area
    transition: 'transform 0.3s ease-in-out', // Smooth transition for the transform
    '&:hover': {
      transform: 'scale(1.05)', // Slightly scale up the image on hover
    },
  });
  

// StyledCardContent for custom styling of the CardContent component
const StyledCardContent = styled(CardContent)({
  flexGrow: 1, // Allows content to expand and fill available space
  minHeight: '150px', // Ensures a consistent height for the content area
});

// StyledTitle for custom styling of the title Typography component
const StyledTitle = styled(Typography)({
  fontFamily: 'Nunito',
  fontWeight: 'bold',
  fontSize: '2rem',
  color: '#fff',
});

// StyledDesc for custom styling of the description Typography component
const StyledDesc = styled(Typography)({
  fontFamily: 'Nunito',
  fontSize: '1.1rem',
  color: '#ddd',
});

export default function ImageCard({ place, checked }) {
  return (
    // Collapse component for the animation effect
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <StyledCard>
        <StyledCardMedia
          image={place.imageUrl} // Image URL from the 'place' prop
          title="Contemplative Reptile" // Title for accessibility
        />
        <StyledCardContent>
          <StyledTitle gutterBottom variant="h5" component="h1">
            {place.title} // Title of the place
          </StyledTitle>
          <StyledDesc variant="body2" color="textSecondary" component="p">
            {place.description} // Description of the place
          </StyledDesc>
        </StyledCardContent>
      </StyledCard>
    </Collapse>
  );
}
