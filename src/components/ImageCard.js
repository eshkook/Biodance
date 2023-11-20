import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';

// StyledCard uses the MUI styled API to apply custom styles to the Card component
const StyledCard = styled(Card)({
  maxWidth: 645, // Sets the maximum width of the card
  background: 'rgba(0,0,0,0.5)', // Semi-transparent black background
  margin: '20px', // Margin around the card
});

// StyledCardMedia for styling the CardMedia component
const StyledCardMedia = styled(CardMedia)({
  height: 440, // Sets the height of the media (image) area
});

// StyledTitle for custom styling of the title Typography component
const StyledTitle = styled(Typography)({
  fontFamily: 'Nunito', // Sets the font family to Nunito
  fontWeight: 'bold', // Makes the font bold
  fontSize: '2rem', // Sets the font size
  color: '#fff', // Sets the font color to white
});

// StyledDesc for custom styling of the description Typography component
const StyledDesc = styled(Typography)({
  fontFamily: 'Nunito', // Sets the font family to Nunito
  fontSize: '1.1rem', // Sets the font size
  color: '#ddd', // Sets the font color to a light grey
});

export default function ImageCard({ place, checked }) {
  return (
    // Collapse component controls the animation and visibility of the card
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <StyledCard>
        <StyledCardMedia
          image={place.imageUrl} // Sets the image URL for the card
          title="Contemplative Reptile" // Sets the title for the image
        />
        <CardContent>
          <StyledTitle gutterBottom variant="h5" component="h1">
            {place.title} // Displays the title of the place
          </StyledTitle>
          <StyledDesc variant="body2" color="textSecondary" component="p">
            {place.description} // Displays the description of the place
          </StyledDesc>
        </CardContent>
      </StyledCard>
    </Collapse>
  );
}
